//BBDD connection
const { Pool } = require("pg");
const queries = require("../models/queriesModel");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "psycare_test",
  password: "admin",
});

//Login
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