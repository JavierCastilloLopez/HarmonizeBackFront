import { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import './css/reproductor.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faBackward, faForward, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie";


export function Reproductor() {
  const [canciones,setCanciones]=useState([])
  const [indice, setIndice] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([false, 0]);
  const [tipe, setTipe] = useState(1);
  
  const [cookies, setCola, removeCola] = useCookies(['colaSongs']);

  useEffect(() => {
 }, [cookies])
 

 if(cookies.colaSongs && canciones[0]==undefined){
  console.log(cookies.colaSongs)
  setCanciones(cookies.colaSongs)

 }
  const nextSong=()=>{
    if(tipe>0){
      if(indice<canciones.length){
        setIndice(indice+1)
        console.log(canciones.length)
      }else{
        setIndice(0)
      }
    }else{
      setIndice(parseInt(Math.random()*canciones.length))
    }


  }

  // Código para cambiar el volumen
  const handleVolumeChange = (event) => {
    const audio = document.getElementById("audio-element");
    audio.volume = event.target.value / 11;
  };

  const toggleMute = () => {
    //para mutear
    const help = volume[1]
    const audio = document.getElementById("audio-element");
    setVolume([!volume[0], audio.volume])
    audio.volume = help

  }


  const handlePlayPauseClick = () => {
    const audio = document.getElementById("audio-element");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = document.getElementById("audio-element");
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    setProgress(currentTime / duration * 100);
    if(currentTime==duration){
      nextSong()
    }
   
  };
  const handleSkipBackward = () => {
    // Código para saltar hacia atrás
    const audio = document.getElementById("audio-element");
    audio.currentTime = 0
  };

  const handleSkipForward = () => {
    nextSong()
    
    
  };
  
  if (canciones[indice])
    return (
      <>
        <div className="music-player">
          <div className="album-info">
            <img className="album-cover" src={canciones[indice].image.S} alt="Album cover" />
            <div className="song-info">
              <h3 className="song-title">{canciones[indice].title.S}</h3>
              <p className="artist-name">{canciones[indice].artist.S}</p>
            </div>
          </div>
          <audio
            id="audio-element"
            src={canciones[indice].rutaFile.S}
            onTimeUpdate={handleTimeUpdate}
          
          />
          <div className="controls">
            <div>
              <button className="skip-btn" onClick={handleSkipBackward}>
                <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
              </button>
            </div>

            <div>
              {isPlaying ? (
                <button className="pause-btn" onClick={handlePlayPauseClick}>
                  <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                </button>
              ) : (
                <button className="play-btn" onClick={handlePlayPauseClick}>
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                </button>
              )}
            </div>
            <div>
              <button className="skip-btn" onClick={handleSkipForward}>
                <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
              </button>
            </div>

            <div className="progress-bar">

              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
            <div className="audio-control">
              <button className="volume-btn" onClick={toggleMute}>
                <FontAwesomeIcon icon={volume[0] ? faVolumeMute : faVolumeUp} />
              </button>
              <div className="volume-slider">
                <input type="range" id="volume" name="volume"
                  min="0" max="11" onChange={handleVolumeChange}  />

              </div>
            </div>

          </div>
        </div>
      </>
    );
}

