const { pool } = require('./config/neonConfig');

async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connected to Neon! Current time:', res.rows[0].now);
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        pool.end();
    }
}

testConnection();