require('dotenv').config(); // Carga las variables de .env
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usa la string de conexión de neon
    ssl: { rejectUnauthorized: false } // Requerimiento de Neon database
});

module.exports = { pool };