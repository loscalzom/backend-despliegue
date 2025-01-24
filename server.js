import express from 'express'

import ENVIROMENT from './config/enviroment.js'

import mongoose from './config/mongoDB.config.js'
import connectDB from './config/mongoDB.config.js'

import User from './models/User.model.js'
import cors from 'cors'

const app = express()

const PORT = ENVIROMENT.PORT

app.use(cors({
origin: "http://localhost:5173"


}))

app.use(express.json())

import statusRoute from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import loginRouter from './routes/login.routes.js'
import { sendMail } from './utils/mail.util.js'
import workspaceRouter from './routes/workspace.route.js'
 import channelRouter from './routes/channel.route.js'


app.use("/api/status", statusRoute)

app.use("/api/auth", authRouter)

app.use("/api/login", loginRouter)

app.use("/api/workspace", workspaceRouter)

app.use("/api/channel", channelRouter)






app.listen(PORT, () => {    
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)})
/* 
    sendMail({to: "marceloscalzo@gmail.com",subject: "mensaje de prueba", html:`<h1>Hola desde Node.js</h1>`}) */
