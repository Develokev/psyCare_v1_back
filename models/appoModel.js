//BBDD connection
const { Pool } = require('pg');
const queries = require('../models/queriesModel');

const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'psycare_test',
    password: 'admin',

})

//Appointments model CRUD

const getAllAppoMod = async () => {

    let client, result;

    try {
        client = await pool.connect();
        result = await client.query(queries.allAppoQuery);

    } catch (error) {
        console.log('get all appo model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result;
}

const appoByUserIdMod = async (id) => {

    let client, result;

    try {
        client = await pool.connect();
        result = await client.query(queries.appoByUserIdQuery, [id]);

    } catch (error) {
        console.log('get appo by ID model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result;
}

const createAppoMod = async (appoRole) => {

    let client, result;
    const {appoDate, appoTime, appoType, user_id, appoStatus} = appoRole

    try {
        client = await pool.connect();
        result = await client.query(queries.createAppoQuery, [appoDate, appoTime, appoType, user_id, appoStatus]);

    } catch (error) {
        console.log('create appo model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result;
}

module.exports = {
    getAllAppoMod,
    appoByUserIdMod,
    createAppoMod
}