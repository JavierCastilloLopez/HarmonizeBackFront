import songs from './mocks/explorer.json'
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/explorer.css'

export function Explorer() {
    return (
        <div>
            {Object.keys(songs).map((genre) => (
                <GenreSection genre={genre} key={genre} />
            ))}
        </div>
    );
}



function SongCard({ song }) {
    return (

        <div className="card">
            <div className="content">
                <div className="back">
                    <div className="back-content">
                        <img src={song.image} alt="" />




                        <strong>{song.title}</strong>
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
                        <small className="badge">{song.title}</small>

                        <FontAwesomeIcon className="badge-icon" icon={faPlay}></FontAwesomeIcon>
                        <div className="description">
                            <div className="title">
                            <FontAwesomeIcon className='action' icon={faHeart}></FontAwesomeIcon>
                                <div className="artist-name">
                                    <strong>{song.artist}</strong>
                                    
                                </div>
                                
                                <p className="card-footer">
                                    {song.time}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function GenreSection({ genre }) {
    return (
        <div className="genre-section">
            <div>
                <h2>{genre}</h2>
                <div className="song-card-container">
                    {songs[genre].map((song) => (
                        <SongCard song={song} key={song.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};