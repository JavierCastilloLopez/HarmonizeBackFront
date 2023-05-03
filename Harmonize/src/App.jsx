
import { Playlist } from './Playlist.jsx'

import { useState } from "react"
import { Explorer } from './Explorer.jsx';
import { Reproductor } from './reproductor.jsx';
import {Login,Register} from './Session.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './Navbar.jsx';

import {UploadSong} from './UploadSong.jsx'
function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const serverURL='http://localhost:3000'

 
  return (
    <Router>
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} serverURL={serverURL} />
      <div className={`main ${showNavbar && 'expanded'}`}>
        {<Routes>
        

        <Route path="/playlist/:idPlaylist" element={<Playlist serverURL={serverURL}/> }>
          
        </Route>

        <Route path="/:actualPlaylist" element={<Explorer serverURL={serverURL}/>}>
        
        </Route>
          <Route path="/login" element={<Login serverURL={serverURL}/>}>
        
        </Route>
        <Route path="/register" element={<Register serverURL={serverURL}/>}>
        
        </Route>
        <Route path="/newSong" element={<UploadSong serverURL={serverURL} />}></Route>
        
        <Route path="/" element={<Explorer serverURL={serverURL}/>}>
        
        </Route>
     
          
        
      </Routes>}
      </div>
      {<Reproductor/>}
    </Router>
  );
}

export default App;
