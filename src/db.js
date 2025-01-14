const { Pool } = require('pg');
const { db } = require('./config')

// Configuración del pool
const pool = new Pool({
    user: db.user,
    password: db.pass,
    host: db.host,
    port: db.port, // Este campo debe ser un número, no una cadena
    database: db.database,
});

// Conexión a la base de datos
const connectToDb = async () => {
    try {
        const client = await pool.connect(); // Espera a que se establezca la conexión
        console.log('Conexión exitosa a la base de datos');
        client.release(); // Libera el cliente después de usarlo
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
    }
};

// Llamada a la función para probar la conexión
connectToDb();

module.exports = pool;
