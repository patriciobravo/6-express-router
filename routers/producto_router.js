const express = require('express');

const { listar, getxId, guardar,  borrar, update, productoById, imagen} = require('../controller/producto_controller');

const router = express.Router();

router.param('productoId', productoById);


router.get('/producto', listar);
router.get('/producto/:productoId', getxId);
router.get('/producto/imagen/:productoId', imagen);
router.post('/producto', guardar);
router.delete('/producto/:productoId', borrar);
router.put('/producto/:id', update);

module.exports = router;