const ModelProducto = require('../models/producto_model');

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

function listar(req, res, id) {

    let myquery = ModelProducto.find(id);

    myquery 
        .select('-imagen')
        .exec( (err, items) => {

            if(err || !items) return errorHandler(items, err)
    
            return res.json({
                    items: items
                })
        })
};

//Get x Id Producto

function productoById(req, res, next, id) {
  
    let myquery = ModelProducto.findById(id);

    myquery 
    .select('-imagen')
    .exec((err, docProducto) => {
   
        if( err || !docProducto) return errorHandler(docProducto, next, err)

       req.docProducto = docProducto;
       next();
    
      
    })
}

function getxId(req, res, next) {

    return res.json({
        data: req.docProducto
    })



    // console.log('metodo param')

    // let myquery = ModelProducto.findById(id);

    // myquery 
    // .select('-imagen')
    // .exec((err, docProducto) => {
   
    //     if( err || !docProducto) return errorHandler(docProducto, next, err)

    //     req.docProducto = docProducto;
    //     next();
    // })
}

//Guardar Producto

function guardar(req, res, next)  {

    let data = {
        producto_nombre: req.body.producto_nombre,
        descripcion: req.body.descripcion,  
        precio: req.body.precio,      
        stock: req.body.stock,
        vendidos: req.body.vendidos,
        disponible: req.body.disponible,
        categoria_nombre: req.body.categoria_nombre
    }

    let modelProducto = new ModelProducto(data);

    if(req.files) {
        console.log(req.files);
        modelProducto.imagen.data =        req.files.imagen.data;
        modelProducto.imagen.contentType = req.files.imagen.minetype;
    }

    modelProducto.save((err, docProducto) => {

        if(err || !docProducto) return errorHandler(docProducto, next, err);

        docProducto = docProducto.toObject();
        delete docProducto.imagen

        res.json({
            data: docProducto
            //message: 'Guardado'
        });

    })
   
};

//Borrar Producto

function borrar(req, res)  {

    let docProducto = req.docProducto
    docProducto.disponible = false;
    docProducto.save( (err, item) => {
        if(err || !item) return errorHandler(item, err)

        return  res.json({
            items: item
        });
    })
};


//Actualizar Producto

function update(req, res, next)  {

    let id = req.params.id;
    console.log(id)

    ModelProducto.findByIdAndUpdate(id, req.body, { new: true },
        (err, docProducto) => {

            if(err || !docProducto) return errorHandler(docProducto, next, err)

            return  res.json({
                items: docProducto
            });
        })
    
   
};

module.exports = {
    productoById,
    listar,
    getxId,
    guardar,
    borrar,
    update
}