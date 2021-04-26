var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var modelUsuario = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'USER_ROLE',
  },
  disponible: {
    type: Boolean,
    default: true
  },
  cart: {
    items: [{
      productoId: {
        type: Schema.Types.ObjectId,
        ref: 'modelProducto'
      },
      cantidad: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }]
  }
});

modelUsuario.methods.addCarro = function (docProducto) {

  let index = this.cart.items.findIndex(item => {
    return item.productoId.toString() == docProducto._id.toString()
  });

  console.log('index', index)
  let _cantidad = 1;
  let newCartItems = [...this.cart.items];

  if (index >= 0) {
    _cantidad = this.cart.items[index].cantidad + 1;
    newCartItems[index].cantidad = _cantidad;
    newCartItems[index].total = _cantidad * docProducto.precio;

  } else {
    newCartItems.push({

      productoId: docProducto._id,
      cantidad: _cantidad,
      total: docProducto.precio
    });
  }


  // let newCart = {
  //     items: newCartItems
  // }

  this.cart.items = newCartItems;
  return this.save();
}


modelUsuario.methods.cleanCarro = function () {

  this.cart = { items: [] };
  return this.save();
}

modelUsuario.methods.deleteProdCarro = function (docProducto) {

  let index = this.cart.items.findIndex(item => {
    return item.productoId.toString() == docProducto._id.toString()
  });

  console.log('index', index)
  let _cantidad = 1;
  let newCartItems = [...this.cart.items];

  newCartItems[0, 1, 2]

  if (index >= 0) {
    _cantidad = this.cart.items[index].cantidad - 1;


    if (_cantidad === 0) {
      newCartItems.splice(index, 1);
      console.log('sin producto ')
    } else {
      newCartItems[index].cantidad = _cantidad;
      newCartItems[index].total = newCartItems[index].total - docProducto.precio;
    }

  } //else {
  //   newCartItems.push({

  //     productoId: docProducto._id,
  //     cantidad: _cantidad,
  //     total: docProducto.precio
  //   });
  // }


  // let newCart = {
  //     items: newCartItems
  // }

  this.cart.items = newCartItems;
  return this.save();
}



const model = mongoose.model('ModelUsuario', modelUsuario);

module.exports = model;

