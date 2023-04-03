

import { getPlaylist,login } from "./importLogical.js"



import express from 'express'
const app = express()
const port = 3000
const direcciones = ['search', 'subir', 'eliminar', 'mp3', 'bd/playlist/:id',"login"]
import cors from 'cors'


app.use(cors())


direcciones.forEach(url => {
 
    app.get(`/api/${url}`, (req,res) => {
      if(url.includes(":"))
      main(url.substring(0,url.indexOf(':')-1), res,req)
      else
      main(url,res,req)
    })
    
  
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function main(action, res,req) {


  switch (action) {
    case 'search':
      res.sendFile(__dirname + '/playlist.json')
      break;
    case 'mp3':
      res.sendFile(__dirname + '/mocks/arnau.mp3')
      break;
    case 'bd/playlist':
      getPlaylist(res,req)
      break;
    case "login":
      console.log("hola")
      login(res,req)
      break;

    default:
      return 'error404'
      break;
  }
}
//npm create vite@latest {nameApp} --template react-swc