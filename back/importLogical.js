import { addItem, deleteItem, getTable, getItem, getUserByEmail, getSongByName, addtoPlaylist, playlistFollowed, playlistCreate } from "./conexinBD.js"
import { subirArchivoAS3 } from "./conexionS3.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Yup from "yup"
import YupPassword from 'yup-password';
import { v4 as uuidv4 } from 'uuid';



YupPassword(Yup);
const { object, string, number, boolean } = Yup

export async function getPlaylist(req, res) {
    const Songs = await getItem('Playlist', req.params.id, 'IdPlaylist')


    const getData = async (data) => {
        let DataA = []
        let result
        let indice = 0
        for (const IdCancion of data) {
            result = await getItem('Cancion', IdCancion, 'IdCancion')
            DataA[indice] = result[0]
            indice++
        }
        DataA.sort((a, b) => { return a.id - b.id })
        return DataA
    }
    console.log(Songs)
    if (Songs[0].Canciones) {
        Songs[0].Canciones.SS = await getData(Songs[0].Canciones.SS)

        res.send(Songs[0])
    } else {
        res.status(500).send('not Songs in playlist')
    }
}

export async function login(req, res) {
    let data = req.body
    console.log(data)
    const userBD = await getUserByEmail(data.email)
    console.log(userBD)
    if (!userBD) {
        return res.json({
            ok: false,
            err: {
                message: 'Usuario o contraseña incorrecto'
            }
        }
        )



    }
    if (!bcrypt.compareSync(data.password, userBD.password.S)) {
        return res.json({
            ok: false,
            err: {
                message: 'Usuario o contraseña incorrecto'
            }
        }
        )

    }


    let token = jwt.sign({
        usuario: userBD,

    },
        process.env.TOKEN_SECRET, {
        expiresIn: process.env.Time_Session
    }
    )


    res.header('auth-token', token).json({
        ok: true,
        err: null,
        data: {
            token,
            user: {
                name: userBD.name.S
            }
        }
    })


}

export async function register(req, res) {
    let data = req.body

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    const schema = object({
        name: string()
            .required("El campo nombre es obligatorio")
            .min(1, "El nombre tiene que tener al menos un carácter")
            .max(100, "El nombre no puede superar los 100 carácteres"),
        age: Yup.date()
            .max(maxDate, 'Debes tener como mínimo 18 años')
            .min(minDate, 'Ingresa una fecha válida')
            .required('Ingresa tu fecha de nacimiento'),
        email: string()
            .required("El email es obligatorio")
            .email("El email no tiene un formato válido"),
        password: string()
            .required('La contraseña es obligatoria')
            .min(
                8,
                'La contraseña debe contener 8 o más caracteres con al menos uno de cada uno: mayúscula, minúscula, número y especial'
            )
            .minLowercase(1, 'La contraseña debe contener al menos 1 letra minúscula')
            .minUppercase(1, 'La contraseña debe contener al menos 1 letra mayuscula')
            .minNumbers(1, 'La contraseña debe contener al menos 1 numero')
            .minSymbols(1, 'La contraseña debe contener al menos 1 simbolo'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden. Inténtalo de nuevo.'),


    });

    if (! await getUserByEmail(data.email)) {

        try {


            await schema.validate(data);

        } catch (err) {
            res.json(err)
        }
        const user = {

            "Email": {
                "S": data.email
            },
            "password": {
                "S": bcrypt.hashSync(data.password, 10)
            },
            "name": {
                "S": data.name
            },
            "age": {
                "N": `${new Date(data.age).getTime()}`
            },
            "IdUser": {
                "S": uuidv4()
            }
        }
        res.json(await addItem('User', user))
    } else {
        res.json({ error: ["El correo ya esta registrado"] })
    }
}

export async function getUserData(req, res) {
    res.json(await getUserByEmail(jwt.decode(req.header('auth-token')).usuario.Email.S))


}

export async function getCancion(req, res) {
    const Songs = await getItem('Cancion', req.params.id, 'IdCancion')

    res.json(Songs)
}
export async function getExplorer(req, res) {
    let json = await getTable('Cancion')
    let response = {}
    console.log(json)
    json.map(cancion => {
        console.log(cancion)
        if (response[cancion.genre.S])
            response[cancion.genre.S].push(cancion)
        else
            response[cancion.genre.S] = [cancion]
    })


    res.json(response)

}

export async function getPlaylistFollowed(req, res) {
    //id de las playlist del usuario actual

    const Playlist = async (object) => {
        let prueba = []
        for (const playlist of object) {

            let item = await getItem('Playlist', playlist, 'IdPlaylist')

            await prueba.push(item[0])

        }

        return prueba
    }
    let object = await getUserByEmail(jwt.decode(req.header('auth-token')).usuario.Email.S)
    let resp
    let follow
    let create
    if (object.playlistFollowed.SS) {
        follow = object.playlistFollowed.SS

    } else {
        follow = []
    }
    if (object.playlistFollowed.SS) {
        create = object.playlistCreate.SS
    } else {
        create = []
    }
    //obtener todos los datos de estas

    resp = await {
        playlistFollowed: await Playlist(follow),
        create: await Playlist(create)
    }

    res.json(resp)



}

export async function filterByName(req, res) {

    const Songs = await getSongByName(req.params.name)

    res.json(Songs)
}

export async function addSongToPlaylist(req, res) {
    console.log(req.body.S)
    const resp = await addtoPlaylist(req.params.id, req.body.S)
    console.log("aaa" + resp + 'aaa')
    res.json(resp)
}

export async function LogicSubida(req, res) {
    const name = (file, path) => {
        const nombreArchivo = file.originalname;
        const partes = nombreArchivo.split(".");
        const extension = partes[partes.length - 1];

        const name = path + uuidv4() + "." + extension
        return name
    }
    const artista = req.body.artista;
    const genero = req.body.genero;
    const title = req.body.titulo;
    const cancion = req.files["cancion"][0];
    const duration = req.body.duration.split(".")[0]
    const cancb = cancion.buffer
    const image = req.files["imagenCancion"][0];
    const imageb = image.buffer
    const nameSong = name(cancion, 'audio/')
    const nameImage = name(image, 'image/')

    const userCreate = req.user.usuario.IdUser.S

    const Song = {

        "rutaFile": {
            "S": "https://harmonizecontainer.s3.amazonaws.com/" + nameSong
        },
        "image": {
            "S": "https://harmonizecontainer.s3.amazonaws.com/" + nameImage
        },
        "genre": {
            "S": genero
        },
        "artist": {
            "S": artista
        },
        "IdCancion": {
            "S": uuidv4()
        },
        "time": {
            "S": duration
        },
        "UserCreate": {
            "S": userCreate
        },
        "title": {
            "S": title
        }
    }

    try {
        let result = await subirArchivoAS3(cancb, 'harmonizecontainer', nameSong, 'public-read', 'audio/mpeg');
        result += await subirArchivoAS3(imageb, 'harmonizecontainer', nameImage, 'public-read', 'image/*');
        result += await addItem('Cancion', Song)
        res.send({ message: 'Archivo subido con éxito a S3 ' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al subir archivo a S3');
    }


}

export async function addPlaylist(req, res) {

    const Playlist = {


        "name": {
            "S": req.body.name
        },
        "Followers": {
            "N": "1"
        },
        "IdPlaylist": {
            "S": uuidv4()
        },

    }
    let response = await addItem('Playlist', Playlist)
    if (response["$metadata"].httpStatusCode == 200) {
        response = await playlistCreate(req.user.usuario.IdUser.S, Playlist.IdPlaylist.S)
        console.log("aaaa")
        if (response["$metadata"].httpStatusCode == 200) {
            response = await playlistFollowed(req.user.usuario.IdUser.S, Playlist.IdPlaylist.S)
            res.json(response)
        }

    }


}
export async function followPlaylist(req, res) {



    let response = await playlistFollowed(req.user.usuario.IdUser.S, req.body.IdPlaylist)
    res.json(response)




}



