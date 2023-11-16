/**DOCS
 * Middleware que se encarga de comprobar si el email del usuario ya existe en la BBDD antes de crearlo.
 * Si no existe, hace un "hash" al password y devuelve en el body la contraseña encriptada.
 */

/** @module auth */
const { getPatientByEmailMod } = require("../models/userModel");
const bcrypt = require("bcrypt");

/**DOCS
 * Verifica si el correo existe en BBDD.
 * @async
 * @method middleware
 * @param {Object} req - requerimiento de la ruta - solicitud a Express.
 * @param {Object} res - respuesta de la ruta - solicitud a Express.
 * @param {Function} next - middleware de express que hace que la función no se detenga independiente del respuesta en caso de que la haya.
 * @returns {JSON} devuelve una contraseña encriptada en caso de que la petición sea correcta y el correo no exista previamente en BBDD.
 * @throws {Error} devuelve error si hay un problema en al solicitud. Devuelve un mensaje de error en caso de que el correo exista.
 */
const checkEmail = async (req, res, next) => {

  /**
   * @constant {String} email - recibe el email proporcionado por el usuario en la solicitud.
   * @constant {String} password - recibe la contraseña proporcionada por el usuario en la solicitud.
   */
  const { email, password } = req.body;

  /**
   * @constant {Object} emailExist - devuelve un objeto con la verificación del email y el resultado de la consulta.
   */
  const emailExists = await getPatientByEmailMod(email);

  // Si rowCount == 1 significa que hay un usuario con ese email ya creado
  if (emailExists.rowCount == 1) {
    res.status(400).json({
      ok: false,
      msg: "Email already exists, unable to create new user",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;

    next();
  }
};

module.exports = { checkEmail };
