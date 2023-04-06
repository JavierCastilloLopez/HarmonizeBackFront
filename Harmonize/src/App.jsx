
import { Playlist } from './Playlist.jsx'
import { canciones } from './mocks/playlist.json'
import { useState } from "react"
import { Explorer } from './Explorer.jsx';
import { Reproductor } from './reproductor.jsx';
import {Login,Register} from './Session.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navbar } from './Navbar.jsx';
import {getUserData
} from './fetch.js'
function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [user,setUser]=useState({})
  if(Cookies.get('token')){
    getUserData('token',setUser)


  }
  return (
    <Router>
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      <div className={`main ${showNavbar && 'expanded'}`}>
        {<Routes>
        <Route path="/playlist/:idPlaylist/:actualPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/playlist/:idPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/:actualPlaylist" element={<Explorer/>}>
        
        </Route>
          <Route path="/login" element={<Login/>}>
        
        </Route>
        <Route path="/register" element={<Register/>}>
        
        </Route>
        
        
        <Route path="/" element={<Explorer canciones={canciones}/>}>
        
        </Route>
     
          
        
      </Routes>}
      </div>
      {<Reproductor/>}
    </Router>
  );
}

export default App;
