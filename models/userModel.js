/**DOCS
 * Conexión a BBDD - SQL
 * Estableciendo conexión con base de datos a través de clase Pool del archivo config.
 * Modelos y estructura de obtención de datos de usuarios a través de queriesModel.js.
 */
const { pool } = require("../config/neonConfig");
const queries = require("../models/queriesModel");

/**DOCS
 * Modelo de obtención de datos filtrados desde la BBDD que busca todas los usuarios
 * @method getAllPatientsMod
 * @async
 * @returns {json} devuelve todos los pacientes en BBDD - result
 * @throws {error} devuelve error en la petición si hay un problema en la conexión a la BBDD
 */
const getAllPatientsMod = async () => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.allPatientsQuery);
  } catch (error) {
    console.log("all patients model FAILED");
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

/**DOCS
 * Modelo de obtención de datos que busca un usuario por email
 * @method getPatientByEmailMod
 * @async
 * @param {String} email recibe el correo a comparar.
 * @returns {json} devuelve la data de un paciente si encuentra coincidencia por correo - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si el correo no existe.
 */
const getPatientByEmailMod = async (email) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.patientByEmailQuery, [email]);
  } catch (error) {
    console.log("patient by email model FAILED");
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

/**DOCS
 * Modelo que obtiene los datos de un paciente por user_id.
 * @method getPatientByIdMod
 * @async
 * @param {String} id recibe el ID del usuario que se quiere buscar.
 * @returns {json} devuelve los datos del usuario encontrado - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const getPatientByIdMod = async (id) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.patientByIdQuery, [id]);
  } catch (error) {
    console.log("patient by ID model FAILED");
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

/**DOCS
 * Modelo de creación de usuario (paciente) que genera un user_id automáticamente.
 * @method createPatientMod
 * @async
 * @param {Object} dataRole recibe un objeto con los datos del usuario a crear
 * dataRole = rol, nombre, apellido, correo, pass, avatar
 * @returns {json} devuelve true si se crea el usuario correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const createPatientMod = async (dataRole) => {
  let client, result;
  const { name, last_name, email, password, avatar } = dataRole;

  try {
    client = await pool.connect();
    result = await client.query(queries.createPatientQuery, [
      "patient",
      name,
      last_name,
      email,
      password,
      avatar,
    ]);
  } catch (error) {
    console.log("create patient model FAILED");
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

/**DOCS
 * Modelo de actualización de datos de un usuario por user_id
 * Construye una query dinámica que solo actualiza los campos proporcionados.
 * @method updatePatientMod
 * @async
 * @param {String} id recibe el ID del usuario que se va a actualizar.
 * @param {Object} body recibe un objeto con la data nueva a sobreescribir sobre el usuario.
 * body = nombre (requerido), apellido (requerido), phone (opcional), password (opcional) y avatar (opcional).
 * @returns {json} devuelve el usuario actualizado si la operación es exitosa - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const updatePatientMod = async (id, body) => {
  let client, result;
  const { name, last_name, phone, password, avatar } = body;

  try {
    client = await pool.connect();

    // Construir query dinámicamente
    let query = "UPDATE users SET ";
    const values = [];
    let paramIndex = 1;

    // Siempre actualizar name y last_name (obligatorios)
    query += `name = $${paramIndex}, `;
    values.push(name);
    paramIndex++;

    query += `last_name = $${paramIndex}, `;
    values.push(last_name);
    paramIndex++;

    // Phone (opcional)
    if (phone !== undefined) {
      query += `phone = $${paramIndex}, `;
      values.push(phone);
      paramIndex++;
    }

    // Avatar (opcional)
    if (avatar) {
      query += `avatar = $${paramIndex}, `;
      values.push(avatar);
      paramIndex++;
    }

    // Password (solo si viene en el body)
    if (password) {
      query += `password = $${paramIndex}, `;
      values.push(password);
      paramIndex++;
    }

    // Quitar última coma
    query = query.slice(0, -2);

    // WHERE clause
    query += ` WHERE user_id = $${paramIndex} RETURNING *`;
    values.push(id);

    result = await client.query(query, values);
  } catch (error) {
    console.error("update patient model FAILED");
    console.error(error);
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

/**DOCS
 * Modelo que elimina un usuario por user_id
 * @method deletePatientMod
 * @async
 * @param {String} id recibe el ID del usuario que se va a eliminar de la BBDD.
 * @returns {json} devuelve true si se ha eliminado el usuario correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si los datos llegan incorrectos.
 */
const deletePatientMod = async (id) => {
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.deletePatientQuery, [id]);
  } catch (error) {
    console.log("delete patient model FAILED");
    throw error;
  } finally {
    client?.release();
  }

  return result;
};

module.exports = {
  getAllPatientsMod,
  getPatientByEmailMod,
  createPatientMod,
  deletePatientMod,
  getPatientByIdMod,
  updatePatientMod,
};
