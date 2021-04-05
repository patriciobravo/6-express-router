const express = require('express');
const app = express();

const data = [
    {
        id: 123,
        nombre: 'Polos'
    },
    {
        id: 123,
        nombre: 'Polos'
    }
];

//Listar Producto

function listar(req, res) {
    res.json({
        data:data
    });
};

//Guardar Producto

function guardar(req, res)  {
    res.json({
        message:"Guardado"
    });
};

//Borrar Producto

function borrar(req, res)  {
    res.json({
        message:"Eliminado"
    });
};


//Actualizar Producto

function update(req, res)  {
    res.json({
        message:"Actualizado"
    });
};

module.exports = {
    listar,
    guardar,
    borrar,
    update
}