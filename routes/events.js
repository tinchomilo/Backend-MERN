/* 
    Rutas de eventos / events
    host + /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validarJWT')
const { isDate } = require('../helpers/isDate')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')


const router = Router();

router.use( validarJWT );


// validarJWT es un middleware que se repite en todas las peticiones, enonces en vez de escribirlo en cada una debajo de la inicializacion del router escribo:
// router.use( validarJWT)
// al hacer esto puedo eliminarlo de las peticiones, ya que todas van a pasar por ahi primero
// Entonces resumiendo, antes estaba asi y quedo...:
// router.get('/', validarJWT, getEventos)
// router.get('/', getEventos)


router.get('/', getEventos)



router.post('/', 
[
    check('title', 'El tiulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
    // check('title', 'El tiulo es obligatorio').not().isEmpty(),
    validarCampos
],
crearEvento)


router.put('/:id', actualizarEvento)



router.delete('/:id', eliminarEvento)


module.exports = router;