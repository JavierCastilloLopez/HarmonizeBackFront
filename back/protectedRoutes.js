import express from "express";


  import { getUserData } from "./importLogical.js";
 const route = express.Router()

 route.get('/user', (req, res,next) => {
    getUserData(req,res)

})




export const protectedRoutes=route

