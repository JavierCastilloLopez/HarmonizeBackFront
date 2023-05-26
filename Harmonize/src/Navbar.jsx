
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faList, faCheck, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie'
import './css/Navbar.css'

export function Navbar({ showNavbar, setShowNavbar, serverURL }) {
  const [token, setToken] = useCookies(['token']);
  console.log(serverURL)
  console.log(token)
  if (token.token) {
    return (<LogedNavbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} serverURL={serverURL} />)

  }
  return (<NoLogedNavbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} serverURL={serverURL} />)
}

function LogedNavbar({ showNavbar, setShowNavbar, serverURL }) {
 
  const [animated, setAnimated] = useState(false)

  const [load, setLoad] = useState(false)
  const [token, setToken, removeToken] = useCookies();
  console.log(serverURL)
  if (!load) {
    fetch(`${serverURL}/api/navbarPlaylist`, {
      method: 'GET',
      headers: {
        'auth-token': `${token.token}`
      }
    })
      .then(response => response.json())
      .then(async (list) => {

        // Aquí puedes trabajar con la respuesta en formato JSON


        setToken('playlist', list)
        console.log(token.playlists)
        setLoad(true)

      }).catch((err) => console.log(err))

  }
  useEffect(() => { }, [token])

  const animar = () => {
    setLoad(false)
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

  const removeTokens = () => {
    console.log(token)
    removeToken('token')
    removeToken('playlist')
    removeToken('user')
    removeToken('playlists')
    removeToken('colaSongs')
  }
  
  return (
    <>


      <nav className={`sidebar-container ${showNavbar && 'mostrar'}`}>
        <FontAwesomeIcon icon={faUser} className={`profile-picture ${animated && 'profile-picture-animated'}`} onClick={handleShowNavbar} alt="Profile" />
        <div className="user-profile">

          <div className={`profile-info ${animated && 'animated'}`}>
            <h3 className="name">{token.user.name[0].toUpperCase() + token.user.name.substring(1).toLowerCase()}</h3>
            <p className="premium" onClick={() => { removeTokens() }}>Salir</p>
          </div>
        </div>
        <ul className={` ${animated && 'animated'} `}>
          <li>
            <NavLink to="/" activeClassName="active">
              <FontAwesomeIcon icon={faMusic} />
              <span>Canciones</span>
            </NavLink>
            <NavLink to="/newSong" activeClassName="active">
              <FontAwesomeIcon icon={faUpload} />
              <span>Subir tu musica</span>
            </NavLink>
          </li>
        
        </ul>
        {(
          <div className={`playlist-container ${animated && 'animated'}`}>
            <h4>Listas de reproducción

            </h4>

            <ul>
              {token.playlist ? token.playlist.playlistFollowed.map((playlist) =>

              (
                <li className="playlist-item" key={playlist.IdPlaylist.S}>
                  <Link to={`/playlist/${playlist.IdPlaylist.S}`} className='playlist-item-a'>
                    <FontAwesomeIcon icon={faList} />
                    <span className="playlist-name">{playlist.name.S}</span>
                  </Link>
                </li>
              )) : ''}
              <li className="playlist-item" >
                <AddPlaylist token={token} setLoad={setLoad} serverURL={serverURL} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );





}

function AddPlaylist({ token, setLoad, serverURL }) {
  const [activeForm, setActive] = useState(false)
  const [editableContent, setEditableContent] = useState("");
  console.log(serverURL)
  const handleEditableContentChange = (event) => {
    const newContent = event.target.innerText;
    setEditableContent(newContent);
    console.log(editableContent)
  };
  const handleForm = () => {
    setActive(!activeForm)


  }

  const sendPlaylist = (serverURL) => {
    handleForm()
    if (editableContent.trim() != '') {
      let body = `{"name":"${editableContent.trim()}"}`
      console.log(body)
      
      fetch(`${serverURL}/api/playlist`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token.token}`

        },
        body: body
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          setLoad(false)
        })
        .catch(err => console.error(err))
    }
  }

  if (!activeForm) {
    return (
      <Link className='playlist-item-a' onClick={handleForm}>
        <FontAwesomeIcon icon={faPlus} />
        <span className="playlist-name">Nueva playlist</span>
      </Link>
    )

  }
  else {
    return (

      <div className='playlist-item-a'>
        <FontAwesomeIcon icon={faCheck} onClick={() => sendPlaylist(serverURL)} /> <span className="playlist-name" contenteditable="true" onInput={handleEditableContentChange}>Escribe el nombre</span>
      </div>


    )
  }
}
function NoLogedNavbar({ showNavbar, setShowNavbar, serverURL }) {
  const navegador = useNavigate()

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



  return (
    <>


      <nav className={`sidebar-container ${showNavbar && 'mostrar'}`}>

        <FontAwesomeIcon icon={faUser} className={`profile-picture ${animated && 'profile-picture-animated'}`} onClick={handleShowNavbar} alt="Profile" />

        <div className={` ${animated && 'animated'}`}>
          <div className="login">
            <button className="btn-login" onClick={() => navegador("/login")}> Login</button>
            <button className="btn-register" onClick={() => navegador("/register")}> Register</button>
          </div>

        </div>

        <ul className={` ${animated && 'animated'} `}>
          <li>
            <NavLink to="/" activeClassName="active">
              <FontAwesomeIcon icon={faMusic} />
              <span>Canciones</span>
            </NavLink>
          </li>
          {
            /*
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

            */
          }
        </ul>

      </nav>
    </>
  );






}


