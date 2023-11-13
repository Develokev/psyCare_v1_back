/**DOCS
 * CRUD Appointments
 * Controladores de las rutas que filtran la información y data de APPOINTMENTS a través de los scripts en el front.
 * Se encargan de manejar la información y realizar validaciones antes de enviarlas a los modelos(models) para que lleguen correctamente.
 */

const {
  getAllAppoMod,
  appoByUserIdMod,
  createAppoMod,
  updateAppoMod,
  deleteAppoMod,
  appoByStatusMod,
  appoByStatusByUserMod,
  changeStatusMod
} = require("../models/appoModel");


/**DOCS
 * Controlador que hace la consulta a la BBDD y devuelve todas las citas.
 * @method getAllAppoControl
 * @async
 * @param {Object} req requerimiento de la ruta.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve "data" con la información de todas las citas en la BBDD - data
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD.
 */
const getAllAppoControl = async (req, res) => {
  let data;

  try {
    data = await getAllAppoMod();

    if (data) {
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "all appo controller FAILED, please contact Admin",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y todas citas bajo un user_id(paciente).
 * @method appoByUserIdControl
 * @async
 * @param {Object} req requerimiento de la ruta. Debe obtener el "id" del usuario desde los params de la ruta.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve "data" con la información de las citas encontradas bajo dicho usuario(id) en la BBDD - data
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no ha encontrado ningún usuario bajo ese "id"(user_id).
 */
const appoByUserIdControl = async (req, res) => {
  let data, id;
  id = req.params.id;

  try {
    if (id > 1) {
      data = await appoByUserIdMod(id);
      return res.status(200).json({
        ok: true,
        data: data.rows,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "user ID unavailable, check data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "getting appo by user ID controller FAILED, please contact ADMIN",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y crea una cita(appointment) nueva.
 * @method createAppoControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener del "body" el correo(email) del usuario a crear.
 * @param {Object} res respuesta de la ruta.
 * @param {Object} appoRole recibe a través del "body" un json con la data para crear la nueva cita.
 * appoRole = user_id(id), status(pending by default), fecha, hora y tipo de cita.
 * @returns {json} devuelve true si se ha creado correctamente la cita.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos en el body no se han enviado correctamente.
 */
const createAppoControl = async (req, res) => {
  let data, id;
  id = req.params.id;

  const appoRole = {
    user_id: id,
    appoStatus: "pending",
    ...req.body,
  };

  try {
    data = await createAppoMod(appoRole);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, appo successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "creating appo controller FAILED, please contact ADMIN",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y actualiza la información de una cita(appointment) bajo un appointment_id(id)
 * @method updateAppoControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener del "body" la data nueva a actualizar en el usuario(paciente) y del params el "id".
 * @param {Object} res respuesta de la ruta.
 * @param {Object} updateData recibe a través del "body" un json con la data para actualizar la información de la cita.
 * updateData = fecha, hora y tipo de cita.
 * @returns {json} devuelve true si la data ha sido actualizada correctamente.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos en el body no se han enviado correctamente.
 */
const updateAppoControl = async (req, res) => {
  let data, appo_id;
  appo_id = req.params.id;
  const updateData = req.body;

  try {
    data = await updateAppoMod(updateData, appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, data successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "updating appo controller FAILED, please contact ADMIN",
    });
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y busca una cita por appointment_id y la elimina.
 * @method deleteAppoControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener el appointment_id de los params en la ruta.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve true si ha eliminado correctamente la cita.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o no se ha encontrado la cita con "id" coincidente.
 */
const deleteAppoControl = async (req, res) => {
  let data, appo_id;
  appo_id = req.params.id;

  try {
    data = await deleteAppoMod(appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, appo successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "deleting appo controller FAILED, please contact ADMIN",
    });
  }
};

/**
 * READ APPOINTMENTS by status/by user- - UPDATE - CHANGE STATUS
 */

/**DOCS
 * Controlador que hace la consulta a la BBDD y busca todas las citas bajo un mismo estado(status).
 * @method appoByStatusControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener "status" del req.body.
 * @param {Object} res respuesta de la ruta.
 * @returns {json} devuelve la data con las citas encontradas bajo dicho estado(status).
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o no se ha encontrado citas bajo dicho estado(status).
 */
const appoByStatusControl = async (req, res) => {
  let data;
  const status = req.body.status

  try {
    data = await appoByStatusMod(status);
    return res.status(200).json({
      ok: true,
      msg: `filtered by status ${status} correctly`,
      data: data.rows
    })
  } catch (error) {
    return res.status(200).json({
      ok: false,
      msg: `appo by status controller FAILED, pleasse contact ADMIN`
    })
  }
};

/**DOCS
 * Controlador que hace la consulta a la BBDD y busca todas las citas bajo un mismo estado(status), y a su vez najo un user_id(id) en concreto.
 * @method appoByStatusByUserControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener el usuario(user_id) de los params en la ruta y del body obtendrá el estado(status) a filtrar.
 * @param {Object} res respuesta de la ruta.
 * @param {String} status recibe un string con el estado(status) en el body a tracés del cual se van a filtrar los datos.
 * @returns {json} devuelve la data con las citas encontradas bajo dicho estado(status) que también coinciden con ese usuario(user_id).
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o no se ha encontrado citas bajo dicho estado(status) o dicho usuario(user_id).
 */
const appoByStatusByUserControl = async (req, res) => {
  let data;
  const user_id = req.params.id
  const status = req.body.status

  try {
    data = await appoByStatusByUserMod(user_id, status)
    return res.status(200).json({
      ok: true,
      msg: `appo by status ${status} by user_id retrieved successfully`,
      data: data.rows
    })
  } catch (error) {
    return res.status(200).json({
      ok: false,
      mg: 'appo by status by user_id controller FAILED, please contact ADMIN'
    })
  }
}

/**DOCS
 * Controlador que hace la consulta a la BBDD y actuliza el estado(status) de una cita bajo un appoitment_id(id).
 * @method changeStatusControl
 * @async
 * @param {Object} req requerimiento de la ruta. Deberá obtener el usuario(id) de los params de la ruta, y el nuevo estado(newStatus) del "body".
 * @param {Object} res respuesta de la ruta.
 * @param {String} newStatus recibe un string con el estado(status) en el body a tracés del cual se van a filtrar los datos.
 * @returns {json} devuelve true si el estado(status) de la cita se ha actualizado correctamente.
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o no se ha encontrado o si los datos del body no han llegado correctamente.
 */
const changeStatusControl = async (req, res) => {
  let data;

  const appo_id = req.body.appo_id
  const newStatus = req.body.status

  try {
    data = await changeStatusMod(newStatus, appo_id);
    return res.status(200).json({
      ok: true,
      data: data.rowCount,
      msg: "if data = 1, status successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "change status controller FAILED, please contact ADMIN",
    });
  }

}

module.exports = {
  getAllAppoControl,
  appoByUserIdControl,
  createAppoControl,
  updateAppoControl,
  deleteAppoControl,
  appoByStatusControl,
  appoByStatusByUserControl,
  changeStatusControl
};
