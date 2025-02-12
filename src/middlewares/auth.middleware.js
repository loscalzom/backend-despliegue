import ENVIROMENT from "../config/enviroment.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization
    console.log('Authorization Header:', authHeader)

    if (!authHeader) {
      return response.status(401).json({ ok: false, message: 'Authorization header no proporcionada' })
    }

    const access_token = authHeader.split(' ')[1]
    console.log('Access Token:', access_token)

    if (!access_token) {
      return response.status(401).json({ ok: false, message: 'Token no proporcionado' })
    }

    const user_info = jwt.verify(access_token, ENVIROMENT.SECRET_KEY_JWT)
    request.user = user_info

    console.log("Usuario autenticado:", request.user)
    return next()
  } catch (error) {
    console.error('Error en la autenticación:', error.message)
    return response.status(401).json({
      ok: false,
      message: 'Unauthorized',
      error: error.message
    })
  }

}
