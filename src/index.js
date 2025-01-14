const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importar cors
const link = 5150;
const app = express();
const taskRoutes = require('./routes/task.routes');

// Middleware para habilitar CORS
app.use(cors());

app.use(morgan('dev'));
app.use(taskRoutes);

app.use((error, req, res, next) => {
    return res.json({
        message: "ERROR!!!!"

    })

});

app.listen(link, () => {
    console.log("Servidor escucha en el puerto", link);
});
