const express = require('express');

const {addCarro, listarCarro, cleanCarrito,eliminarProdCarrito} = require('../controller/carro_controller');

const router = express.Router();

router.post('/addCarro', addCarro);
router.get('/carro/:id', listarCarro);
router.delete('/carro/:id', cleanCarrito);
router.put('/carro/:id', eliminarProdCarrito);


module.exports = router;