var mongoose = require('mongoose');

var modelCategoria = mongoose.Schema({
    categoria_nombre: {
        type: String,
        required: true,
        unique:true
    }

});

const model = mongoose.model('ModelCategoria', modelCategoria);

module.exports = model;

