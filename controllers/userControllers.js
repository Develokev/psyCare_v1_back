/**DOCS
 * Controladores de las rutas que filtran la información y data a través de los scripts en el front.
 * Se encargan de manejar la información y realizar validaciones antes de enviarlas a los modelos(models) para que lleguen correctamente.
 * 
 * Se llama a generateToken(helper) para el encryptado de contraseña y generación de token de usuario.
 */
const { generateToken } = require("../helpers/generateJWT");

const {
  getAllPatientsMod,
  getPatientByEmailMod,
  createPatientMod,
  deletePatientMod,
  getPatientByIdMod,
  updatePatientMod,
} = require("../models/userModel");

/**DOCS
 * Controlador que hace la consulta a la BBDD y devuelve todos los pacientes.
 * @method getAllPatientsControl
 * @async
 * @param {Object} req requerimiento de la ruta.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve "data" con la información de todos los pacientes en la BBDD json - data
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD.
 */
const getAllPatientsControl = async (req, res) => {
  let data;

  try {
    data = await getAllPatientsMod();

    if (data) {
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "all patients controller FAILED, please contact Admin",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y busca un paciente por correo(email).
 * @method getPatientByEmailControl
 * @async
 * @param {Object} req requerimiento de la ruta. Debe obtener el "email" desde los params de la ruta.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve "data" con la información de un paciente coincidente con dicho correo(email) en la BBDD json - data
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no ha encontrado ningún usuario bajo ese correo(email).
 */
const getPatientByEmailControl = async (req, res) => {
  let data;
  const email = req.params.email;

  try {
    if (email) {
      data = await getPatientByEmailMod(email);
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "patient by email controller FAILED, please contact ADMIN",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y crea un usuario(paciente) nuevo.
 * @method createPatientControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener del "body" el correo(email) del usuario a crear.
 * @param {Object} res respuesta de la ruta.
 * @param {Object} dataRole recibe a través del "body" un json con la data para crear el nuevo usuario
 * dataRole = rol(patient by default), avatar(opcional), nombre, apellido, correo y contraseña.
 * se obtiene también de dataRole el nombre y el rol para utilizarlos en la generación del token.
 * @returns {json} devuelve la data con el paciente(user) nuevo y el "token" generado con el helper - data, token.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos en el body no se han enviado correctamente.
 */
const createPatientControl = async (req, res) => {
  const email = req.body.email;

  const dataRole = {
    role: req.body.role || "patient",
    avatar: req.body.avatar || "https://t.ly/SVHy",
    ...req.body,
  };

  try {
    const data = await createPatientMod(dataRole);

    // Si rowCount == 1 significa que se creó el usuario nuevo
    if (data.rowCount == 1) {
      // Estos son los datos que va a recibir el payload en el "generateToken"
      const user = {
        name: dataRole.name,
        role: dataRole.role,
      };

      const token = await generateToken(user);

      res.status(200).json({
        ok: true,
        mg: "new user created correctly",
        data: dataRole,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "create patient controller FAILED, please contact ADMIN",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y actualiza la información de un usuario(paciente) por user_id(id).
 * @method updatePatientControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener del "body" la data nueva a actualizar en el usuario(paciente) y del params el "id".
 * @param {Object} res respuesta de la ruta.
 * @param {String} id recibe a través de "params" un string con el "id"(user_id) del usuario que a actualizar.
 * @param {Object} body recibe a través del "body" un json con la data para actualizar el nuevo usuario
 * body = nombre, apellido, password y avatar.
 * se obtiene también de "body" el nombre y el rol para utilizarlos en la generación del token al actualizar.
 * @returns {json} devuelve la data actualizada con el paciente(user) nuevo y el "token" generado con el helper - data, token.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos en el body no se han enviado correctamente.
 */
const updatePatientControl = async (req, res) => {
  let data, id;
  id = req.params.id;
  body = req.body;

  try {
    data = await updatePatientMod(id, body);

    if (data.rowCount > 0) {
      const user = {
        name: body.name,
        role: body.role,
      };

      const token = await generateToken(user);

      res.status(200).json({
        ok: true,
        data: data.rowCount,
        msg: "if data = 1, user successfully updated",
        token
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "updating patient info FAILED",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "update patient model FAILED",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y elimina un usuario(paciente) por user_id(id).
 * @method deletePatientControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener el user_id(id) de los params.
 * @param {Object} res respuesta de la ruta.
 * @param {String} id recibe a través de "params" un string con el "id"(user_id) del usuario que se va a eliminar.
 * Primero verifica que el email exista, y luego ejecuta el modelo para eliminar.
 * @returns {json} devuelve true si ha eliminado correctamente el usuario.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o no se ha encontrado el usuario con "id" coincidente.
 */
const deletePatientControl = async (req, res) => {
  let exist, data;
  const id = req.params.id;

  try {
    exist = await getPatientByIdMod(id);

    if (exist.rowCount > 0) {
      data = await deletePatientMod(id);
      res.status(200).json({
        ok: true,
        data: data.rowCount,
        msg: "if data = 1, user successfully created",
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "deleting patient FAILED",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "delete patient control FAILED, please contact ADMIN",
    });
  }
};

module.exports = {
  getAllPatientsControl,
  getPatientByEmailControl,
  createPatientControl,
  deletePatientControl,
  updatePatientControl,
};
