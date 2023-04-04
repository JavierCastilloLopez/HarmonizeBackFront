

import {login,register} from "./importLogical.js"



import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'
import { verifyToken } from "./verifyToken.js"
import { protectedRoutes } from "./protectedRoutes.js"

app.use(cors())
app.use(express.json())

app.post('/login',(req,res)=>{
  login(req,res)
  
})

app.post('/register',(req,res)=>{
  register(req,res)


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use('/api',verifyToken,protectedRoutes)

