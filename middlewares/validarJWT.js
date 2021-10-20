const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // x-token header
    const token = req.header('x-token')
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        // desestructuracion del payload
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED)
        // a la req le asigno los valores que desestructuro de l payload para pasarlo por referencia al next y poder usarlo en otro lado. en este caso en la ruta del renew
        req.uid = uid;
        req.name = name;
        
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
        
    }

    next();
}


module.exports = {
    validarJWT
}