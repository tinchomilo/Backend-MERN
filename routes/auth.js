/* 
    Rutas de usuario / Auth
    host + /api/auth
 */
const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator') 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT')

const router = Router();

router.post('/new',
[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser un mail valido').isEmail(),
    check('password', 'El password debe contener minimo 6 caracteres').isLength({ min:6 }),
    validarCampos
],
crearUsuario );

router.post('/',
[
    check('email', 'El email debe ser un email valido').isEmail(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    validarCampos
],
 loginUsuario )



router.get('/renew', validarJWT, revalidarToken)


module.exports = router;