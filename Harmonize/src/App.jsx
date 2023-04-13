
import { Playlist } from './Playlist.jsx'

import { useState } from "react"
import { Explorer } from './Explorer.jsx';
import { Reproductor } from './reproductor.jsx';
import {Login,Register} from './Session.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navbar } from './Navbar.jsx';
import {getUserData} from './fetch.js'
import {UploadSong} from './UploadSong.jsx'
function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [user,setUser]=useState({})
 
  return (
    <Router>
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      <div className={`main ${showNavbar && 'expanded'}`}>
        {<Routes>
        

        <Route path="/playlist/:idPlaylist" element={<Playlist/>}>
          
        </Route>

        <Route path="/:actualPlaylist" element={<Explorer/>}>
        
        </Route>
          <Route path="/login" element={<Login/>}>
        
        </Route>
        <Route path="/register" element={<Register/>}>
        
        </Route>
        <Route path="/newSong" element={<UploadSong />}></Route>
        
        <Route path="/" element={<Explorer />}>
        
        </Route>
     
          
        
      </Routes>}
      </div>
      {<Reproductor/>}
    </Router>
  );
}

export default App;
