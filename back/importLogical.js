import { addItem, deleteItem, getTable, getItem, getUserByEmail } from "./conexinBD.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Yup from "yup"
import YupPassword from 'yup-password';
import { v4 as uuidv4 } from 'uuid';



YupPassword(Yup);
const { object, string, number, boolean } = Yup

export async function getPlaylist(req, res) {
    const Songs = await getItem('Playlist', req.params.id, 'IdPlaylist')
    let JsonSongs

    const getData = async (data) => {
        let DataA = []
        let result
        let indice = 0
        for (const IdCancion of data) {
            result = await getItem('Cancion', IdCancion, 'IdCancion')
            DataA[indice] = {
                "id": parseInt(result[0].IdCancion.S),
                "nombre": result[0].title.S,
                "artista": result[0].artist.S,
                "imagen": result[0].image.S,
                "time": result[0].time.S
            }
            indice++
        }
        DataA.sort((a, b) => { return a.id - b.id })
        return DataA
    }
    console.log(Songs)
    JsonSongs = await getData(Songs[0].Canciones.SS)

    res.send(JsonSongs)

}

export async function login(req, res) {
    let data = req.body
    console.log(data)
    const userBD = await getUserByEmail(data.email)
    console.log(userBD.password)
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
        data: { token }
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
            
            let item = await getItem('Playlist', playlist.S, 'IdPlaylist')
           
          await  prueba.push(item[0])

        }

        return prueba
    }
    let object = await getUserByEmail(jwt.decode(req.header('auth-token')).usuario.Email.S)
    object = object.playlistFollowed.L

    //obtener todos los datos de estas

    let prueba=await Playlist(object)

    res.json(prueba)

    
    
}