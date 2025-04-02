/**DOCS
 * Conexión a BBDD - SQL
 * Estableciendo conexión con base de datos a través de clase Pool.
 * Modelos y estructura de obtención de datos de usuarios a través de queriesModel.js.
 */
const {pool} = require('../config/neonConfig');
const queries = require("../models/queriesModel");

// const { Pool } = require("pg");
// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   database: "psycare_test",
//   password: "admin",
// });

/**DOCS
 * Modelo de autentificación de datos para hacer "log in". Se verifica que el correo esté almacenado en la BBDD.
 * @method loginModel
 * @async
 * @param {String} email recibe el correo del usuario que está intentando loguearse.
 * @returns {json} devuelve true si se actualiza el usuario correctamente - result
 * @throws {error} devuelve error si hay un problema en la petición a la BBDD o si no encuentra ningún correo coincidente.
 */
const loginModel = async(email) => {
  
  let client, result;

  try {
    client = await pool.connect();
    result = await client.query(queries.patientByEmailQuery, [email])

  } catch (error) {
    console.log('login model failed')
    throw error
  }

  finally {
    client.release();
  }
  //accedo a la posición 0 del array para terminar de limpiar los datos
  return result.rows[0];
}

module.exports = {
    loginModel
}