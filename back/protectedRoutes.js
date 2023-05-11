import express from "express";
import multer from "multer";

  import { getUserData,getPlaylist,getCancion,getPlaylistFollowed,filterByName, addSongToPlaylist,LogicSubida,addPlaylist} from "./importLogical.js";
import { addtoPlaylist } from "./conexinBD.js";
 const route = express.Router()
 const upload=multer()
 route.get('/user', (req, res,next) => {
    getUserData(req,res)

})
route.get('/playlist/:id', (req, res,next) => {
  getPlaylist(req,res)

})
route.get('/cancion/:id', (req, res,next) => {
  getCancion(req,res)

})


route.get('/navbarPlaylist', (req, res,next) => {
  getPlaylistFollowed(req,res)

})



route.post('/playlistAdd/:id', (req, res,next) => {
  addSongToPlaylist(req,res)

})
route.post('/playlist', (req, res,next) => {
  addPlaylist(req,res)

})
route.post('/upload',upload.fields([
  { name: "titulo", maxCount: 1 },
  { name: "artista", maxCount: 1 },
  { name: "genero", maxCount: 1 },
  { name: "imagenCancion", maxCount: 1 },
  { name: "cancion", maxCount: 1 },
  
]), (req, res,next) => {
  LogicSubida(req ,res)
  
})





export const protectedRoutes=route

