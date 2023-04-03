import { useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { playlists } from './mocks/playlists.json'
import './css/Navbar.css'
export function Navbar({showNavbar,setShowNavbar}) {
  
  const [animated, setAnimated] = useState(false)
  const animar = () => {
    setAnimated(true)
    setTimeout(() => setAnimated(false), 1000)
  }
  const handleShowNavbar = () => {

    if (window.innerWidth < 1100) {
      setShowNavbar(!showNavbar)
      animar()
      console.log(showNavbar)
    }
  }

  let isPremium = true
  let profilePicture = 'https://fastly.picsum.photos/id/1009/200/200.jpg?hmac=2D10SFaYliFjzL4jp_ZjLmZ1_2jaJw89CntiJGjdlGE'
  return (
    <>


      <nav className={`sidebar-container ${showNavbar && 'mostrar'}`}>
        <img className={`profile-picture ${animated && 'profile-picture-animated'}`} src={profilePicture} onClick={handleShowNavbar} alt="Profile" />
        <div className="user-profile">

          <div className={`profile-info ${animated && 'animated'}`}>
            <h3 className="name">Nombre de Usuario</h3>
            <p className="premium">Premium</p>
          </div>
        </div>
        <ul className={` ${animated && 'animated'}`}>
          <li>
            <NavLink to="/" activeClassName="active">
              <FontAwesomeIcon icon={faMusic} />
              <span>Canciones</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/albumes" activeClassName="active">
              <FontAwesomeIcon icon={faList} />
              <span>Álbumes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/artistas" activeClassName="active">
              <FontAwesomeIcon icon={faUser} />
              <span>Artistas</span>
            </NavLink>
          </li>
        </ul>
        {(
          <div className={`playlist-container ${animated && 'animated'}`}>
            <h4>Listas de reproducción</h4>
            <ul>
              {playlists.map((playlist) => (
                <li className="playlist-item" key={playlist.id}>
                  <Link to={`/playlist/${playlist.id}`}className='playlist-item-a'>
                    <FontAwesomeIcon icon={faList} />
                    <span className="playlist-name">{playlist.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

