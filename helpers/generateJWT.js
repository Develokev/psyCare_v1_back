/**DOCS
 * El payload recibe dos argumentos: user_id y name, esto sería "user".
 * Hace también la llamada a la variable de entorno "JWT_SECRETE_KEY", previamente establecida en el archivo .env
 */

/** @module auth */
const jwt = require('jsonwebtoken');

/**DOCS
 * Helper GENERATE TOKEN de la dependencia "jsonwebtoken" que ha de recibir un payload para generar el token del usuario cuando sse crea, se actualiza, y se loguea.
 * @async
 * @param {Object} user objeto que contiene la información del usuario que vamos a pasar por payload para generar el Token
 * @param {String} user.user_id ID del usuario
 * @param {String} user.name - Nombre del usuario
 * @returns {Promise<String>} devuelve un String con el Token generado con el payload.
 * @throws {error} devuelve un error en la petición si en la generación de token falla o si la info payload viene incorrecta.
 */
const generateToken = (user) => {
    
    return new Promise ((resolve,reject) => {
        
        /**
        * @constant {Object} payload - Contenido codificado del token JWT.
        */
        const payload = {...user}

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:'1h'},
            (error,token) => {
                if(error){
                    console.log(error)
                    reject('FAILED to create TOKEN')
                 } else {
                    resolve(token);
                 }
            }
            )
    })
}

module.exports={
    generateToken
}