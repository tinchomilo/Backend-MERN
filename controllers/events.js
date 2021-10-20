const { response }  = require('express')
const Evento = require('../models/Evento')

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')

    res.status(200).json({
        ok: true,
        msg: 'getEventos',
        eventos
    })

}


const crearEvento = async(req, res = response) => {

    const evento = new Evento( req.body )
    
    evento.user = req.uid

    try {


        const eventoGuardado = await evento.save()
        
        res.status(200).json({
            ok: true,
            evento: eventoGuardado  
        })

        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById( eventoId )

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg:' No existe un evento con ese id',
            })
        }

        if( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tenes privilegios para modificar este evento'
            })
        }

        // creo el evento nuevo con todos los datos que vienen por body, y le agrego el user ya que no viene en el body
        const eventoNuevo = {
            ...req.body,
            user: uid
        }
        // para actualizar el evento busco en la base de datos el evento con findByIdAndUpdate y este recibe 2 poarametros, el id del evento a actualizar, y los nuevos datos. en este caso el id esta en eventoId y la data nueva en eventoNuevo. el objeto al final { new: true } es para que retorne la modificacion que realizamos, sino el cambio queda en la base de datos y retorna el viejo para verificar cambios. Pero como yo quiero ver el nuevo se coloca ese objeto
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, eventoNuevo, { new: true})

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}



const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        
        if( !eventoId) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese nombre'
            })
        }
    
        const evento = await Evento.findById( eventoId)
    
        if( evento.user.toString() !== uid){
            return res.status(400).json({
                ok: false,
                msg: 'No tenes privilegios para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId) 

        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        })        
    }
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}