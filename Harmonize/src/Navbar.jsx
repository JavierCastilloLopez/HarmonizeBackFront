
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faList, faCheck, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useCookies } from 'react-cookie'
import './css/Navbar.css'

export function Navbar({ showNavbar, setShowNavbar }) {
  const [token, setToken] = useCookies(['token']);

  console.log(token)
  if (token.token) {
    return (<LogedNavbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />)

  }
  return (<NoLogedNavbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />)
}

function LogedNavbar({ showNavbar, setShowNavbar }) {

  const [animated, setAnimated] = useState(false)
  const [playlists, setdata] = useState([])
  const [load, setLoad] = useState(false)
  const [token, setToken, removeToken] = useCookies(['playlist']);
  if (!load) {
    fetch(`http://localhost:3000/api/navbarPlaylist`, {
      method: 'GET',
      headers: {
        'auth-token': `${token.token}`
      }
    })
      .then(response => response.json())
      .then((list) => {

        // Aquí puedes trabajar con la respuesta en formato JSON
        setdata(list)
        setLoad(true)
        setToken('playlist', list)
        console.log(token)

      }).catch((err) => console.log(err))

  }

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


  let profilePicture = 'https://fastly.picsum.photos/id/1009/200/200.jpg?hmac=2D10SFaYliFjzL4jp_ZjLmZ1_2jaJw89CntiJGjdlGE'
  return (
    <>


      <nav className={`sidebar-container ${showNavbar && 'mostrar'}`}>
        <img className={`profile-picture ${animated && 'profile-picture-animated'}`} src={profilePicture} onClick={handleShowNavbar} alt="Profile" />
        <div className="user-profile">

          <div className={`profile-info ${animated && 'animated'}`}>
            <h3 className="name">{token.user.name[0].toUpperCase() + token.user.name.substring(1).toLowerCase()}</h3>
            <p className="premium" onClick={() => removeToken("token")}>Salir</p>
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
          {/*   <li>
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
  </li>*/}
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
              )):''}
              <li className="playlist-item" >
                <AddPlaylist token={token} setLoad={setLoad} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );





}

function AddPlaylist({ token, setLoad }) {
  const [activeForm, setActive] = useState(false)
  const [editableContent, setEditableContent] = useState("");

  const handleEditableContentChange = (event) => {
    const newContent = event.target.innerText;
    setEditableContent(newContent);
    console.log(editableContent)
  };
  const handleForm = () => {
    setActive(!activeForm)


  }

  const sendPlaylist = () => {
    let body=`{"name":"${editableContent}"}`
    console.log(body)
    handleForm()
    fetch("http://localhost:3000/api/playlist", {
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
        <FontAwesomeIcon icon={faCheck} onClick={sendPlaylist} /> <span className="playlist-name" contenteditable="true" onInput={handleEditableContentChange}>Escribe el nombre</span>
      </div>


    )
  }
}
function NoLogedNavbar({ showNavbar, setShowNavbar }) {
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

  let isPremium = true
  let profilePicture = 'https://fastly.picsum.photos/id/1009/200/200.jpg?hmac=2D10SFaYliFjzL4jp_ZjLmZ1_2jaJw89CntiJGjdlGE'
  return (
    <>


      <nav className={`sidebar-container ${showNavbar && 'mostrar'}`}>

        <img className={`profile-picture ${animated && 'profile-picture-animated'}`} src={profilePicture} onClick={handleShowNavbar} alt="Profile" />

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


