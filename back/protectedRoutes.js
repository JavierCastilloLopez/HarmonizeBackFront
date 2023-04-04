import express from "express";
 const route = express.Router()

 route.get('/user', (req, res,next) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
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
export const protectedRoutes=route

