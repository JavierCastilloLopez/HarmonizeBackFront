
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import './css/explorer.css'
export function Explorer() {

    const [data, setdata] = useState({})
    const [load, setLoad] = useState(false)

    if (!load) {
        fetch(`http://localhost:3000/explorer`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((cancion) => {

                // Aquí puedes trabajar con la respuesta en formato JSON
                setdata(cancion)
                setLoad(true)

            }).catch((err) => console.log(err))

    }

    if (load) {
        console.log(data)
        return (
            <div>
                {Object.keys(data).map((genre) => (
                    <GenreSection genre={genre} songs={data[genre]} />
                ))}
            </div>
        );
    }
    
}



function SongCard({ song }) {
    const [cola, setCookie, deleteCookie] = useCookies(['colaSongs'])
  
    const pushNext = () => {
        console.log(cola.colaSongs)
        if (cola.colaSongs) {
            if (!cola.colaSongs.some(objeto => JSON.stringify(objeto) === JSON.stringify(song))) {


                let copy = [...cola.colaSongs]
                copy.unshift(song)
                setCookie('colaSongs', copy)
                console.log(cola.colaSongs)
            }
        } else {
            setCookie('colaSongs', [song])
            console.log('addfirst')
        }

    }

    return (

        <div className="card">
            <div className="content">
                <div className="back">
                    <div className="back-content">
                        <img src={song.image.S} alt="" />




                        <strong>{song.title.S}</strong>
                    </div>
                </div>
                <div className="front">

                    <div className="img">
                        <div className="circle">
                        </div>
                        <div className="circle" id="right">
                        </div>
                        <div className="circle" id="bottom">
                        </div>
                    </div>

                    <div className="front-content">
                        <small className="badge">{song.title.S}</small>

                        <FontAwesomeIcon className="badge-icon" icon={faPlay} onClick={pushNext}></FontAwesomeIcon>
                        <div className="description">
                            <div className="title">
                                <FontAwesomeIcon className='action' icon={faHeart}></FontAwesomeIcon>
                                <div className="artist-name">
                                    <strong>{song.artist.S}</strong>

                                </div>

                                <p className="card-footer">
                                    {song.time.S}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function GenreSection({ genre, songs }) {
    console.log(genre)
    return (
        <div className="genre-section">
            <div>
                <h2>{genre}</h2>
                <div className="song-card-container">
                    {
                        songs.map((song) => (
                            <SongCard song={song} key={song.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};