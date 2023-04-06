

import './css/playlist.css'
import { Cancion } from './Cancion.jsx'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function Playlist() {
  const [load,setLoad]=useState(false)
  const [canciones,setCanciones]=useState([])
  const [rootDirectory,setDirectory]=useState(document.location.origin.split(":")[1])
  
  const {idPlaylist}=useParams()
  
  if(!load)
   fetch(`http://${rootDirectory}:3000/api/bd/playlist/${idPlaylist}`)
   
  .then(response => response.json())
  .then((canciones) => {
    // Aquí puedes trabajar con la respuesta en formato JSON
    setCanciones(canciones)
    setLoad(true)  
    
  })
  .catch(error => {
    console.error('Error al obtener canciones:', error);
  });

  return (
    <div className="song">
     

        {canciones.map(cancion =>

          <Cancion cancion={cancion} />



        )}
    
    </div>

  )
}