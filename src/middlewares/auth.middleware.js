import ENVIROMENT from "../config/enviroment.js"
import jwt from 'jsonwebtoken'
export const authMiddleware = (request, response, next) => {
    try{
    
        const access_token = request.headers.authorization.split(' ')[1]

        if (!access_token) {
            return response.status(401).json({ ok: false, message: 'Token no proporcionado' });
        }

        const user_info = jwt.verify(access_token, ENVIROMENT.SECRET_KEY_JWT)
        
        request.user = user_info
        return next()
    }
    catch(error){
        console.error('Error en la autenticación:', error);
        return response.status(401).json({
            ok: false,
            message: 'Unauthorized',
            error: error.message
        })
    }
}