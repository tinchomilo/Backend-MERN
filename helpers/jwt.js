const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) => {

    return new Promise(( resolve, reject ) => {

        // genero el payload
        const payload = { uid, name};

        // la firma del jwt se compone: el payload, una secret key y la duracion
        jwt.sign( payload, process.env.SECRET_JWT_SEED , {
            expiresIn: '2h'
        }, (err, token) => {

            if( err ){
                console.log(err)
                reject( 'No se pude generar el token' )
            }

            resolve( token );
            
        })                
    })
}


module.exports = {
    generarJWT
}