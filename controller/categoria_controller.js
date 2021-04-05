// const express = require('express');
// const app = express();

const ModelCategoria = require('../models/categoria_model');

const data = [
    {
        id: 123,
        categoria: "Polos",
        nombre: "Polo Rambo"
    },
    {
        id: 123,
        categoria: "Polos",
        nombre: "Polo Levy"
    }
];

//Listar Categoria

function listar(req, res) {
    res.json({
        data
    });
};

//Get Categoria

function getCategoria(req, res) {
    res.json({
        id: 123,
        categoria: "Polos",
        nombre: "Polo Levy"
    });
};

//Guardar Categoria

function guardar(req, res)  {
    let data = {
        categoria_nombre: "polos"
    }

    modelCategoria = new ModelCategoria(data);
    modelCategoria.save( (err, docCategoria) => {
        
        console.log(err)
        console.log(docCategoria)

    })
    res.json({
        message:"Guardado"
    });
};

//Borrar Categoria

function borrar(req, res)  {
    res.json({
        message:"Eliminado"
    });
};


//Actualizar Categoria

function update(req, res)  {
    res.json({
        message:"Actualizado"
    });
};

module.exports = {
    listar,
    getCategoria,
    guardar,
    borrar,
    update
}