import express from "express";


  import { getUserData,getPlaylist,getCancion,getPlaylistFollowed,filterByName} from "./importLogical.js";
 const route = express.Router()

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




export const protectedRoutes=route

