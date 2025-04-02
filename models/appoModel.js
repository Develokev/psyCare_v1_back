/**DOCS
 * Conexión a BBDD - SQL
 * Estableciendo conexión con base de datos a través de clase Pool.
 * Modelos y estructura de obtención de datos de citas (appointments) a través de queriesModel.js.
 */
const {pool} = require('../config/neonConfig');
const queries = require("../models/queriesModel");

/**DOCS
 * Modelo de obtención de datos filtrados que busca todas las citas en la BBDD.
 * @method getAllAppoMod
 * @async
 * @returns {json} devuelve un json con todas las citas en BBDD - result
 * @throws {error} devuelve error en la petición si hay un problema en la conexión a la BBDD
 */
const getAllAppoMod = async () => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.allAppoQuery);
  } catch (error) {
    console.log("get all appo model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**DOCS
 * Modelo que obtiene los datos de todas las citas bajo un usuario (user_id).
 * @method getPatientByIdMod
 * @async
 * @param {String} id recibe el ID del usuario, para obtener todas las citas del mismo.
 * @returns {json} devuelve los datos de las citas encontradas najo un usuario - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no encuentra ningún usuario con ese user_id.
 */
const appoByUserIdMod = async (id) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.appoByUserIdQuery, [id]);
  } catch (error) {
    console.log("get appo by ID model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**DOCS
 * Modelo de creación de cita bajo un user_id.
 * @method createAppoMod
 * @async
 * @param {Object} appoRole recibe un objeto con los datos la cita a crear
 * appoRole = fecha, hora, tipo, user_id, status.
 * @returns {json} devuelve true si se crea la cita correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const createAppoMod = async (appoRole) => {
  let client, result;
  const { appoDate, appoTime, appoType, user_id, appoStatus } = appoRole;

  try {
    client = await pool.connect();
    result = await client.query(queries.createAppoQuery, [
      appoDate,
      appoTime,
      appoType,
      user_id,
      appoStatus,
    ]);
  } catch (error) {
    console.log("create appo model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**DOCS
 * Modelo de actualización de datos de una cita por appointment_id
 * @method updateAppoMod
 * @async
 * @param {String} id recibe el ID de la cita que se va a actualizar.
 * @param {Object} updateData recibe un objeto con la data nueva a sobreescribir sobre la cita.
 * updateData = fecha, hora, tipo.
 * @returns {json} devuelve true si se actualiza el usuario correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const updateAppoMod = async (updateData, appo_id) => {
  let client, result;
  const { appoDate, appoTime, appoType } = updateData;

  try {
    client = await pool.connect();
    result = await client.query(queries.updateAppoQuery, [
      appoDate,
      appoTime,
      appoType,
      appo_id,
    ]);
  } catch (error) {
    console.log("updating appo model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**DOCS
 * Modelo que elimina una cita por appointment_id
 * @method deleteAppoMod
 * @async
 * @param {String} appo_id recibe el ID de la cita que se va a eliminar de la BBDD.
 * @returns {json} devuelve true si se ha eliminado la cita correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD.
 */
const deleteAppoMod = async (appo_id) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.deleteAppoQuery, [appo_id]);
  } catch (error) {
    console.log("deleting appo model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**
 * READ APPOINTMENTS by status/by user- - UPDATE - CHANGE STATUS
 */

/**DOCS
 * Modelo de obtención de datos que filtra las citas por estado(status).
 * @method appoByStatusMod
 * @async
 * @param {String} status recibe un string con el estado que se quieren filtrar las citas (pending,confirmed,paid,cancelled).
 * @returns {json} devuelve un json con las citas encontradas con ese estado - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no encuentra ninguna cita con dicho estado.
 */
const appoByStatusMod = async (status) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.appoByStatusQuery, [status]);
  } catch (error) {
    console.log("appo by status model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

/**DOCS
 * Modelo de obtención de datos que filtra las citas por estado(status), y a su vez por usuario(user_id).
 * @method appoByStatusByUserMod
 * @async
 * @param {String} status recibe un string con el estado que se quieren filtrar las citas (pending,confirmed,paid,cancelled).
 * @returns {json} devuelve un json con las citas encontradas con ese estado - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no encuentra ninguna cita con dicho estado.
 */
const appoByStatusByUserMod = async (user_id, status) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.appoByStatusByUserQuery, [
      status,
      user_id,
    ]);
  } catch (error) {
    console.log("appo by status, by user model FAILED");
    throw error;
  } finally {
    client.release();
  }
  return result;
};

/**DOCS
 * Modelo de actualización del estado(status) de una cita por appointment_id
 * @method changeStatusMod
 * @async
 * @param {String} appo_id recibe el ID de la cita a la que se le va a a actualizar el estado.
 * @param {String} newStatus recibe un string con el nuevo estado(status) a sobreescribir en la cita.
 * @returns {json} devuelve true si se actualiza el estado de la cita correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const changeStatusMod = async (newStatus, appo_id) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.changeStatusQuery, [
      newStatus,
      appo_id,
    ]);
  } catch (error) {
    console.log("change status model FAILED");
    throw error;
  } finally {
    client.release();
  }

  return result;
};

module.exports = {
  getAllAppoMod,
  appoByUserIdMod,
  createAppoMod,
  updateAppoMod,
  deleteAppoMod,
  appoByStatusMod,
  appoByStatusByUserMod,
  changeStatusMod,
};
