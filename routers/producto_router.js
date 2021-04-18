const express = require('express');

const { listar, getxId, guardar,  borrar, update, productoById} = require('../controller/producto_controller');

const router = express.Router();

router.param('productoId', productoById);


router.get('/producto', listar);
router.get('/producto/:productoId', getxId);
router.post('/producto', guardar);
router.delete('/producto/:id', borrar);
router.put('/producto/:id', update);

module.exports = router;