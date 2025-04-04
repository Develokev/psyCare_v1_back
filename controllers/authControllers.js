/**DOCS
 * Login Controller
 * Controladores de las rutas que filtran y verifican la información que entra a través de los scripts en el front al momento del "log in".
 * Se encargan de manejar la información y realizar validaciones antes de enviarlas a los modelos(models) para que lleguen correctamente.
 * 
 * Se llama a bcrypt para verificar la data que entra con la información en la base de datos para otorgar el acceso.
 * Se llama a generateToken(helper) para el encriptado/desencriptado de contraseña y generación de token de usuario.
 */
const bcrypt = require("bcrypt");
const { loginModel } = require("../models/authModel");
const { generateToken } = require("../helpers/generateJWT");

/**DOCS
 * Controlador de autentificación de datos para hacer "log in". Se verifican los datos a través de consultas a la BBDD.
 * @method loginController
 * @async
 * @param {Object} req requerimiento de la ruta. Debe obtener el correo(email) y contraseña(password) del "body".
 * @param {Object} res respuesta de la ruta.
 * @param {Object} body recibe el correo y la contraseña del usuario.
 * @returns {json} devuelve true si verifica la existencia del correo del body en la BBDD.
 * Hace una llamada para verificar que el correo exista en la BBDD, luego encripta/desencripta contraseña y verifica nuevamente.
 * Si la verificación de ambos parámetros es correcta, se concede el acceso.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD, si el correo no existe en la BBDD, si no coincide, o si la contraseña no es verificada.
 */
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailOk = await loginModel(email);

    if (!emailOk) {
      return res.status(404).json({
        ok: false,
        msg: "Email-password incorrect",
      });
    }

    const loginPass = emailOk.password;
    const checkPass = bcrypt.compareSync(password, loginPass);

    if (!checkPass) {
      return res.status(401).json({
        ok: false,
        msg: "Email-password incorrect",
      });
    } else {
      const user = {
        name: emailOk.name,
        role: emailOk.role,
      };
      const token = await generateToken(user);

      return res.status(200).json({
        ok: true,
        msg: "Login successfull",
        token,
      });
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: "login controller FAILED, please, contact ADMIN.",
    });
  }
};

module.exports = {
  loginController,
};
