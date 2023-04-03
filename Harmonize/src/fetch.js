const backURL = 'http://localhost:3000'

export async function getPlaylist(idPlaylist) {

    return fetch(`${backURL}/api/bd/playlist/${idPlaylist}`)
        .then(response => response.json())
        .then( (canciones) => {
           
            return  canciones

        }
        )
    
    
}