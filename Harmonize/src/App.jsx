
import { Playlist } from './Playlist.jsx'
import { canciones } from './mocks/playlist.json'
import { useState } from "react"
import { Explorer } from './Explorer.jsx';
import { Reproductor } from './reproductor.jsx';
import {Login,Register} from './Session.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './Navbar.jsx';

function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [user, setLoged] = useState({ loged: false })

  return (
    <Router>
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} user={user} />
      <div className={`main ${showNavbar && 'expanded'}`}>
        {<Routes>
        <Route path="/playlist/:idPlaylist/:actualPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/playlist/:idPlaylist" element={<Playlist canciones={canciones}/>}>
          
        </Route>

        <Route path="/:actualPlaylist" element={<Explorer/>}>
        
        </Route>
          <Route path="/login" element={<Login setLoged={setLoged}/>}>
        
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
