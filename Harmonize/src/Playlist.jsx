

import './css/playlist.css'
import { Cancion } from './Cancion.jsx'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export function Playlist({serverURL}) {
  const [load, setLoad] = useState(false)
  const [canciones, setCanciones] = useState({
    name:{
      S:""}})

  const [token, setToken, removeToken] = useCookies(['token']);
  
  const PlaylistToCola=()=>{
    
    console.log(token.colaSongs)
    console.log(canciones.Canciones.SS)
    setToken('colaSongs',canciones.Canciones.SS)
  }


  const { idPlaylist } = useParams()
  useEffect(() => {
    setLoad(false)
  }, [idPlaylist])
  if (!load)
    fetch(`${serverURL}/api/playlist/${idPlaylist}`, {
      method: 'GET',
      headers: {
        'auth-token': `${token.token}`
      }
    })

      .then(response => response.json())
      .then((canciones) => {
        console.log(canciones)
        // Aquí puedes trabajar con la respuesta en formato JSON
        setCanciones(canciones)
        setLoad(true)

      })
      .catch(error => {
        console.error('Error al obtener canciones:', error);
      });
if(load)
  return (
    <div className="song">

      <div>
        <h1>
          {canciones.name.S} <FontAwesomeIcon icon={faPlay} onClick={PlaylistToCola}></FontAwesomeIcon>
        </h1>
        

      </div>
      {canciones.Canciones.SS.map(cancion =>

        <Cancion cancion={cancion} />



      )}

    </div>

  )
}

