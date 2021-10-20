// importo otra vez express para tener el intellisence( ayuda ) de js. no importa nuevamente express sino que usa la que ya esta cargada
const { response } = require('express');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt') 
const bcrypt = require('bcryptjs')

const crearUsuario = async( req, res = response ) => {

    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        usuario = new Usuario( req.body )

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt)
        
        await usuario.save()

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name)

        console.log(usuario)
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })    
    }    
}

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email }) 

    if( !usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'el usuario no existe'
        })
    }

    // confirmar passwords
    const validPassword = bcrypt.compareSync( password, usuario.password)

    if( !validPassword ){
        return res.status(400).json({
            ok: false,
            msg: 'la contraseña es incorrecta'
        })
    }

    // Generar JWT
    const token = await generarJWT( usuario.id, usuario.name)

    res.status(200).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Por favor comuniquese con el administrador'
        })
    }    
}

const revalidarToken = async( req, res = response ) => {

    const { uid, name } = req

    // Generar JWT
    const token = await generarJWT( uid, name)
   
    return res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

