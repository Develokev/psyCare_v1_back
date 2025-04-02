/**DOCS
 * Middleware que se encarga de validar las entradas (inputs del usuario) a través de "express-validator".
 */

const {validationResult} = require('express-validator');

/**DOCS
 * @async
 * @method middleware
 * @param {Object} req - requerimiento de la ruta - solicitud a Express.
 * @param {Object} res - respuesta de la ruta - solicitud a Express.
 * @param {Function} next - middleware de express que hace que la función no se detenga independiente del respuesta en caso de que la haya.
 * @returns devuelve el resultado de la validación de la entrada.
 * @throws {Error} devuelve error en caso de algún problema en la solicitud.
 */
const validateInputs = (req,res,next) => {

    /**
     * @constant {Object} e - devuelve el "error" que indica el resultado de la verificación del input en caso de que lo haya.
     */
    const e = validationResult(req);

    if(!e.isEmpty()) return res.status(400).json({
        ok: false,
        errors: e.mapped()
    })

    next();
};

module.exports = { validateInputs};