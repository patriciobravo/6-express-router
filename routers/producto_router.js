const express = require('express');

const { listar, guardar,  borrar, update} = require('../controller/producto_controller');

const router = express.Router();

router.get('/producto', listar);
router.post('/producto', guardar);
router.delete('/producto/:id', borrar);
router.put('/producto/:id', update);

module.exports = router;