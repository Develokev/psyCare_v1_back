//BBDD connection
const { Pool } = require('pg');
const queries = require('../models/queriesModel');

const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'psycare_test',
    password: 'admin',

})

//Patient Models (CRUD)

const getAllPatientsMod = async () => {

    let client, result;

    try {
        client = await pool.connect();
        result = await client.query(queries.allPatientsQuery)
        
    } catch (error) {
        console.log('all patients model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result
}

const getPatientByEmailMod = async (email) => {

    let client, result;

    try {
        client = await pool.connect();
        result = await client.query(queries.patientByEmailQuery, [email]);

    } catch (error) {
        console.log('patient by email model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result
}

const createPatientMod = async (dataRole) => {

    let client, result;
    const {role,name,last_name,email,password,avatar} = dataRole

    try {
        client = await pool.connect();
        result = await client.query(queries.createPatientQuery, [role, name, last_name, email, password, avatar])

    } catch (error) {
        console.log('create patient model FAILED')
        throw error
    }

    finally {
        client.release();
    }

    return result
}

module.exports = {
    getAllPatientsMod,
    getPatientByEmailMod,
    createPatientMod
}