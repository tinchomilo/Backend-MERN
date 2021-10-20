const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear el servidor de express
const app = express();

//base de datos
dbConnection();

// CORS
app.use(cors())

// directorio publico
app.use( express.static('public'))

// Lectura y parseo del body
app.use( express.json()) ;


// Rutas
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/events', require('./routes/events') )



// escuchar peticiones
app.listen(4000, () => {
    console.log(`servidor corriendo en el puerto ${ process.env.PORT }`)
})