/**DOCS
 * Middleware que se encarga únicamente de encriptar la contraseña que recibe en la solicitud del usuario.
 */

/** @module auth */
const bcrypt = require("bcrypt");

/**DOCS
 * @async
 * @method middleware
 * @param {Object} req - requerimiento de la ruta - solicitud a Express.
 * @param {Object} res - respuesta de la ruta - solicitud a Express.
 * @param {Function} next - middleware de express que hace que la función no se detenga independiente del respuesta en caso de que la haya.
 * @returns {String} devuelve la contraseña encriptada.
 * @throws {Error} devuelve un error en forma de Json si hay un problema en la petición.
 */
const encryptPass = async (req,res,next) => {

    /**
    * @constant {String} password - recibe la contraseña proporcionada por el usuario en la solicitud.
    */
    const { password } = req.body;

    if(!req.body) {
        res.status(401).json({
            ok: false,
            msg: 'Encrypting password FAILED'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
    }
    next();
}

module.exports = {
    encryptPass
}