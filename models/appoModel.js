//BBDD connection
const { Pool } = require("pg");
const queries = require("../models/queriesModel");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "psycare_test",
  password: "admin",
});

//Appointments model CRUD

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

//Appointment READ by status/by user- - UPDATE - CHANGE STATUS

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
