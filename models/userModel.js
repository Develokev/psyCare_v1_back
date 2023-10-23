//SQL Sentencies
const { Pool } = require('pg');
const queries = require('../models/queriesModel');

const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'psycare_test',
    password: 'admin',

});