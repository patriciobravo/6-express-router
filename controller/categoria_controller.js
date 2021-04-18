// const express = require('express');
// const app = express();

const ModelCategoria = require('../models/categoria_model');

function errorHandler(data, next, err = null){
    if(err){
        return next(err);
      
    }
    if (!data) {
    
        let error = new Error('No existe');
        error.statusCode = 404;
        return next(error)
    }

}

//Listar Categoria

function listar(req, res) {

    ModelCategoria.find().exec( (err, items) => {

        if(err || !items)

        return errorHandler(items, next, err)
        // if(err){
        //     res.status(500).json({
        //         error: err
        //     })
        // }
        // else if (!items) {
        //     res.status(404).json({
        //         data: 'No existe'
        //     })

        // }
          return res.json({
                items: items
            })
      
    })
};

//Get Categoria

function getCategoria(req, res) {
    res.json({
        id: 123,
        categoria: "Polos",
        nombre: "Polo Levy"
    });
};

//Get x Id Categoria

function getCategoria(req, res) {
    let id = req.params.id;

    ModelCategoria.findById(id, (err, docCategoria) => {
        if(err){
            res.status(500).json({
                error: err
            })
        }
        else if (!docCategoria) {
            res.status(404).json({
                message: 'No existe'
            })

        }
        else {
            res.json({
                data: docCategoria
            })
        }
      
    })
}

//Guardar Categoria

function guardar(req, res, next)  {

    console.log(req.body) 
    let data = {
        categoria_nombre: req.body.categoria_nombre
    }

    const modelCategoria = new ModelCategoria(data);
    modelCategoria.save( (err, docCategoria) => {

        if (err || !docCategoria) return errorHandler(docCategoria, next , err)
        
    //    if(err){
    //        return next(err);
           
    //    }
    //    if(!data){
    //        return res.status(404).json({
    //            data: 'No existe'
    //        })
    //    }
       return res.json({
        data: docCategoria
        });
    })
  
};

//Borrar Categoria

function borrar(req, res)  {

    const id = req.params.id;
    console.log(id)
    ModelCategoria.findByIdAndRemove(id, (err, docCategoria) => {
       
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        if (!docCategoria) {
           return res.status(404).json({
                message: 'No existe'
            })
        }
    })

    res.json({
        message:"Eliminado"
    });
};

//Actualizar Categoria

function update(req, res)  {

    const id = req.params.id;

    const data = {
        categoria_nombre: req.body.categoria_nombre
    }

    ModelCategoria.findByIdAndUpdate(id, { categoria_nombre: req.body.categoria_nombre}, {new:true}, (err, docCategoria) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        if (!docCategoria) {
           return res.status(404).json({
                message: 'No existe'
            })
        }
        res.json({
            message:"Actualizado",
            data:docCategoria
            
          
        });
    })

};

module.exports = {
    listar,
    getCategoria,
    guardar,
    borrar,
    update
}