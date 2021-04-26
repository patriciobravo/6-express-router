const express = require('express');

const {generarOrden} = require('../controller/orden_controller');

const router = express.Router();

 router.get('/orden/generar/:idUsuario', generarOrden);
// router.get('/orden/:id', listarorden);
// router.delete('/orden/:id', cleanCarrito);
// router.put('/orden/:id', eliminarProdCarrito);


module.exports = router;