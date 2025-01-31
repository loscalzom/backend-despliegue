import express from 'express'

import ENVIROMENT from './src/config/enviroment.js'

/* import mongoose from './config/mongoDB.config.js'
import connectDB from './config/mongoDB.config.js'

import User from './models/User.model.js' */
import cors from 'cors'

const app = express()

const PORT = ENVIROMENT.PORT

app.use(cors({
origin: ENVIROMENT.URL_FRONTEND


}))

app.use(express.json())

import statusRoute from './src/routes/status.route.js'
import authRouter from './src/routes/auth.route.js'
/* import loginRouter from './routes/login.routes.js' */
import { sendMail } from './src/utils/mail.util.js'
import workspaceRouter from './src/routes/workspace.route.js'
 import channelRouter from './src/routes/channel.route.js'


app.use("/api/status", statusRoute)

app.use("/api/auth", authRouter)
/* 
app.use("/api/login", loginRouter) */

app.use("/api/workspace", workspaceRouter)

app.use("/api/channel", channelRouter)






app.listen(PORT, () => {    
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`)}) 

/* export default app */

/* 
    sendMail({to: "marceloscalzo@gmail.com",subject: "mensaje de  prueba", html:`<h1>Hola desde Node.js</h1>`}) */
