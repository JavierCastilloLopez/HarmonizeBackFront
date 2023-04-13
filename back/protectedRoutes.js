import express from "express";
import multer from "multer";

  import { getUserData,getPlaylist,getCancion,getPlaylistFollowed,filterByName, addSongToPlaylist,LogicSubida} from "./importLogical.js";
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
route.get('/filtername/:name', (req, res,next) => {
  filterByName(req,res)

})


route.post('/playlistAdd/:id', (req, res,next) => {
  addSongToPlaylist(req,res)

})
route.post('/upload',upload.single("cancion"), (req, res,next) => {
  LogicSubida(req ,res)
  
})





export const protectedRoutes=route

