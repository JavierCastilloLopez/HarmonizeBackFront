import { addItem, deleteItem, getTable, getItem, getUserByEmail } from "./conexinBD.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario o contraseña incorrecto'
            }
        }
        )



    }
    if (!bcrypt.compareSync(data.password, userBD.password.S)) {
        return res.status(400).json({
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
            error: null,
            data: {token}
        })


}

export async function register(req,res){
   

}