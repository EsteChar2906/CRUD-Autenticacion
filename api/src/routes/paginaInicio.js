const express = require('express');
const controllerPagina = require('../controllers/paginaController.js');
const router = express.Router();

router.get('/', controllerPagina.paginaInicio);

module.exports = router;