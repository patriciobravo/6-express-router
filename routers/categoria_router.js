const express = require('express');

const { listar, guardar, getCategoria, borrar, update} = require('../controller/categoria_controller');

const router = express.Router();

router.get('/categoria', listar);
router.get('/categoria/:id', getCategoria);
router.post('/categoria', guardar);
router.delete('/categoria/:id', borrar);
router.put('/categoria/:id', update);

module.exports = router;