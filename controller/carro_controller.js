const ModelProducto = require('../models/producto_model');
const ModelUsuario = require('../models/usuario_model')


// Add Carro
const addCarro = async (req, res, next) => {

    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

    try {
        
        docProducto = await ModelProducto.findById(productoId).exec();
        console.log(docProducto)
    
        if(!docProducto){
            err = new Error('No existe')
            err.statusCode = 404;
            throw(err)
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();
        docUsuario = await docUsuario.addCarro(docProducto);

        res.json(docUsuario)

    }catch (error) {

       next(error);
        
    }

  

   
}

// Listar Carro

const listarCarro = (req, res) => {
   
   ModelUsuario.findById(req.params.id).
    
  populate('cart.items', '-productoId').exec((err, items) => {
        if(err) {
            return res.json(err);
        }
        return res.json(items);
    })


}

// Limpiar Carro

const cleanCarrito = async (req, res) => {
   
    let docUsuario = await (await ModelUsuario.findById(req.params.id)).execPopulate()
   
     docUsuario = await docUsuario.cleanCarro(); 

     return res.json(docUsuario)
 
 
 
 }

// Eliminar 1 Producto Carro
const eliminarProdCarrito = async (req, res, next) => {

    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

    try {
        
        docProducto = await ModelProducto.findById(productoId).exec();
        console.log(docProducto)
    
        if(!docProducto){
            err = new Error('No existe')
            err.statusCode = 404;
            throw(err)
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();
        docUsuario = await docUsuario.deleteProdCarro(docProducto);

        res.json(docUsuario)

    }catch (error) {

       next(error);
        
    }

  

   
}


module.exports = {
    addCarro,
    listarCarro,
    cleanCarrito,
    eliminarProdCarrito
 
}