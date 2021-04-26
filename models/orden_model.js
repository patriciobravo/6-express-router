var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ModelOrden = new Schema({
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  productos: [{
    producto: {
      type: Object,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  total: [{
    type: Number,
    required: true
  }],
  fecha_orden: {
    type: Date,
    required: true,
    default: Date.now
  }
});

ModelOrden.methods.generarOrden = async function(docUsuario){
    docUsuario = await docUsuario.populate('cart.items.productoId', '-stock -vendidos -disponible').execPopulate();
    
    console.log(docUsuario.cart)
    let total = 0;
    let producto = docUsuario.cart.items.map(item => {
        total +=item.cantidad * item.productoId._doc.precio;

        return {
            producto : item.productoId._doc,
            cantidad: item.cantidad
        }
    })

    this.productos = producto;
    this.total = total;

    await this.save();
    await docUsuario.cleanCarro();
    return this;
}

const model = mongoose.model('ModelOrden', ModelOrden);

module.exports = model;

