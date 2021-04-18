var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var modelProducto = new Schema({

  producto_nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  vendidos: {
    type: Number,
    default: 0
  },
  disponible: {
    type: Boolean,
  
    default: true
  },
  categoria_nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: Buffer,
    contentType: String
  }
}, {
    timestamps: true
});


const model = mongoose.model('ModelProducto', modelProducto);

module.exports = model;

