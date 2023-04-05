import { addItem, deleteItem, getTable, getItem, getUserByEmail } from "./conexinBD.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Yup from "yup"
import YupPassword from 'yup-password';
import { v4 as uuidv4 } from 'uuid';

YupPassword(Yup);
const { object, string, number, boolean }=Yup

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
        ok:true,
        err: null,
        data: { token }
    })


}

export async function register(req, res) {
    let data = req.body


    const schema = object({
        name: string()
            .required("El campo nombre es obligatorio")
            .min(1, "El nombre tiene que tener al menos un carácter")
            .max(100, "El nombre no puede superar los 100 carácteres"),
        age: number()
            .required("La edad es obligatoria")
            .positive("La edad tiene que ser positiva")            
            .max(90, "La edad no puede superar los 90"),
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

    if(! await getUserByEmail(data.email)){

    try{

        
        await schema.validate(data);

     }catch(err){
      res.json(err)
     }
     const user={
 
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
          "N": `${data.age}`
        },
        "IdUser": {
          "S":uuidv4()
        }
      }
     res.json( await addItem('User',user))
    }else{
        res.json({error:["El correo ya esta registrado"]})
    }
}