/**DOCS
 * Middleware que se encarga de validar un token JWT en la solicitud.
 */

/** @module auth */
const jwt = require('jsonwebtoken');

/**
 * @async
 * @param {Object} req - requerimiento de la ruta - solicitud a Express.
 * @param {Object} res - respuesta de la ruta - solicitud a Express.
 * @param {Function} next - middleware de express que hace que la función no se detenga independiente del respuesta en caso de que la haya.
 * @returns {JSON} devuelve true si existe token y si la verificación del mismo es correcta.
 * @throws {Error} devuelve error si hay un problema en al solicitud y un mensaje de "invalid token".
 */
const validateJWT =async (req,res,next) => {

    /**
    * @constant {String} token - Token JWT extraído de la cabecera 'x-token'.
    */
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'NO TOKEN found in the request'
        })
    }
    
    try {
        /**
        * @constant {Object} payload - Contenido decodificado del token JWT. Recibe el user_id y el name del usuario.
        */
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'INVALID Token'
        })
    }
    next();
}

module.exports = {
    validateJWT
}