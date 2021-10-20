// Instalo nodemon para poder ver los cambios sin necesidad de volver a ejecurtar el archivo con node
// agrego el scrip dev para el nodemon y el start para ejecutar el archivo que quiera a el package json
// npm run dev y npm start, se ejecutan distintos porque node busca directamente el start, el dev es algo creado por mi para comodidad



// la estructura del index.js:
// requiero express
const express = require('express')

//requiero dotenv, que es para poder usar variables de entorno
require('dontenv').config();

// lo inicializo
const app = express();

// Rutas
// Todo lo que vaya a exportar la ruta '/routes/auth.js' se va a poder acceder a travez de '/api/aut'
app.use( '/api/aut', require('./routes/auth') )

// directorio publico
app.use( express.static('public'))

// Lectura y parseo del body. es un middelware que me permite parsear el body y mediante console.log ver la info que hay en el
/* UN MIDDELWARE NO ES MAS QUE UNA FUNCION QUE SE VA A EJECUTAR ANTES DE OTRAS COSAS*/
app.use( express.json()) ;


// Directorio publico. peticion get devuelve un json con ok:true, si no tuviera la res se quedaria esperando una respuesta
app.get( '/', ( req, res ) => {
    res.json({
        ok: true
    })
})

// el puerto en el cual va a estar escuchando las peticiones http, y utilizo template strings porque utilizo variables de entorno, y esto me permite modificar las variables en un solo lugar y que afecte a todas las que tenga ese nombre
app.listen( 4000, () => {
    console.log( `servidor corriendo el el puerto ${ 4000 }`)
})


//***************************************************************************** */
// controllers/auth.js
//creo la funcion que se va a exportar para poder usarla en las rutas cuanse se requiera segun la peticion
const crearUsuario = (req, res) => {

    res.json({
        ok: true
    })
}
// como van a ser varias funciones, de acuerdo a la cantidad de peticiones que halla, se exporta un objeto con cada una de las funciones
module.exports = {
    crearUsuario,
}


// archivo routes/auth.js
// Extraigo Router de express para poder utilizarlo, lo podria haber escrito en dos linea asi:
const express = require('express');
const router = expres.Router

//pero es mas comodo asi
const { Router } = require('express');
const router = Router();

// extraigo check de express-validator
const { check } = require('express-validator');
const { validarCampos } = require('./middlewares/validar-campos');
// check es una funcion que va a validar los campos que le pases en la peticion. ejemplo
router.post('/new',
 [ 
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     // 1° argumento, name: es el campo a evaluar
     // 2° el mensaje de error, el name es obligatorio
     // 3° .not().isEmpty no deja que falte este campo
     check('email', 'El email es obligatorio').isEmail(),
     check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min:6 }),
     validarCampos
     // validar campos es un custom middleware que utilizo para validar los datos, y como se repite en mas de una peticion creo un middleware
 ], 
 crearUsuario);
// desde el archivo controllers exporto la funcion que se va a ejecutar cuando haga las peticiones, en este caso es la de crearUsuario

// si solo fuera un middleware se puede escribir asi....
router.post('/new', middleware, crearUsuario);

// pero como es mas de uno se ponen entre corchetes [ un array ]
router.post('/new', [ middlewares], crearUsuario);


router.get( '/', crearUsuario )

// Para validar las fechas utilizo moment, en el check custom( isdate ) es un callback que defino en los helpers


/********************************************************************************************* */

//                                          MONGO DB






/********************************************************************************************* */

//                                          Jsonwebtoken

