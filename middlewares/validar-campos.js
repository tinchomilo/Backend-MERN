const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = ( req, res = response, next ) => {

    // Manejo de errores
    // a la funcion validationResult le envio la req
    const errors = validationResult( req )
    //en este caso errors.isEmpty() si esta vacio es true, al negarlo quiero preguntar si hay errores
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next()
}

module.exports = { 
    validarCampos
}