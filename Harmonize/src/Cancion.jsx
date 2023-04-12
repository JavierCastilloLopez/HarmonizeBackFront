import './css/cancion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlay, faEllipsisVertical, faList } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {useCookies} from "react-cookie"

export function Cancion({ cancion }) {

	const [song, setSong] = useState(cancion.liked)
	const [menu, setMenu] = useState(false)
	const [cola, setCookie, deleteCookie] = useCookies(['colaSongs'])
  
    const pushNext = () => {
        
        if (cola.colaSongs) {
            if (!cola.colaSongs.some(objeto => JSON.stringify(objeto) === JSON.stringify(cancion))) {


                let copy = [...cola.colaSongs]
                copy.unshift(cancion)
                setCookie('colaSongs', copy)
                
            }
        } else {
            setCookie('colaSongs', [cancion])
            
        }

    }
	const chageLike = () => {

		setSong(!song)

	}
	const changeMenu = () => {
		setMenu(!menu)

	}
	
	return (
		<div className='song-row' >




			<div className={menu ? 'song-container menu' : 'song-container'}>
				<div className="play-button" >
					<button className='play-button' onClick={pushNext} >
						<FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
					</button>
				</div>
				<div className="song-photo" onClick={pushNext}><img src={`../${cancion.image.S}`} alt="Song photo" /></div>
				<div className='info'>
					<div><h1>{cancion.title.S}</h1></div>
					<div><h2>{cancion.artist.S}</h2></div>
					<div> <p>{cancion.time.S}</p></div>
				</div>
				<div className="song-like" onClick={chageLike}>
					<button className={song ? 'like-button liked' : 'like-button'} >
						<FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
					</button>
				</div>
				<div className='action-menu' onClick={changeMenu}>
					<FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
				</div>
				<div className={menu ? 'menu-popover' : 'menu-popover no-visible'}>
					<button className={song ? 'like-button liked' : 'like-button'} onClick={chageLike}>
						<FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
					</button>
					<button className='playlist-button' >
						<FontAwesomeIcon icon={faList}></FontAwesomeIcon>
					</button>

				</div>
			</div>
			{/*
					<div className='song-container menu'>

						<div className="play-button" >
							<button className='play-button' >
								<FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
							</button>
						</div>
						<div className="song-photo"><img src={cancion.imagen} alt="Song photo" /></div>
						<div className='info'>
							<div><h1>{cancion.nombre}</h1></div>
							<div><h2>{cancion.artista}</h2></div>
						</div>
						<div className='action-menu' onClick={changeMenu}>
							<FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
						</div>
						
					</div>
	*/}


		</div>


	);


}