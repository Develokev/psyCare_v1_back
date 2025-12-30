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
const encryptPass = async (req, res, next) => {
  // Verificar que req.body exista ANTES de usarlo
  if (!req.body) {
    return res.status(400).json({
      ok: false,
      msg: "No se recibieron datos",
    });
  }

  /**
   * @constant {String} password - recibe la contraseña proporcionada por el usuario en la solicitud.
   */
  const { password } = req.body;

  // Solo encripta si password existe y no está vacía
  if (password && password.trim() !== "") {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      req.body.password = hashedPassword;
    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: "Error al encriptar contraseña",
      });
    }
  }

  next();
};

module.exports = {
  encryptPass,
};
