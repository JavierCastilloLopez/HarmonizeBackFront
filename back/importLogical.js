import { addItem, deleteItem, getTable, getItem, scanItem} from "./conexinBD.js"



export async function getPlaylist(res, req) {
    const Songs = await getItem('Playlist', req.params.id, 'IdPlaylist')
    let JsonSongs

    const getData = async (data) => {
        let DataA = []
        let result
        let indice = 0
        for (const IdCancion of data) {
            result = await getItem('Cancion', IdCancion, 'IdCancion')
            DataA[indice] =  {
                "id": parseInt(result[0].IdCancion.S),
                "nombre": result[0].title.S,
                "artista": result[0].artist.S,
                "imagen": result[0].image.S,
                "time": result[0].time.S
            }
            indice++
        }
        DataA.sort((a,b)=>{return a.id-b.id})
        return  DataA
    }
    console.log(Songs)
    JsonSongs = await getData(Songs[0].Canciones.SS)

    res.send(JsonSongs)

}

export async function login(res,req,email){
let     result = await getItem('User', "javare660@gmail.com", 'Email')

    res.send(result)

    
}
