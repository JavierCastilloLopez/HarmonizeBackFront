
import { Playlist } from './Playlist.jsx'
import {canciones} from './mocks/playlist.json'
import { useState } from "react"
import { Explorer } from './Explorer.jsx';
import { Reproductor } from './reproductor.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './Navbar.jsx';

function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [rootDirectory,setDirectory]=useState(document.location.origin.split("/",3)[2])
  
  return (
    <Router>
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
      <div className={`main ${showNavbar && 'expanded'}`}>
      <Routes>
        <Route path="/playlist/:idPlaylist/:actualPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/playlist/:idPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/:actualPlaylist" element={<Explorer/>}>
        
        </Route>
        <Route path="/" element={<Playlist canciones={canciones}/>}>
        
        </Route>
     
          
        
      </Routes>
      </div>
      <Reproductor/>
    </Router>
  );
}

export default App;
