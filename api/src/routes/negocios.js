const express = require('express');
const negociosController = require('../controllers/negociosController.js');
const db = require('../db.js');
const router = express.Router();

router.get('/postnegocios', negociosController.getNegocios);

router.post('/postnegocios', negociosController.postNegocios);

router.get('/listnegocios', negociosController.listNegocios);

router.get('/deletenegocio/:id', negociosController.deleteNegocio);

router.get('/editarnegocio/:id', negociosController.editarNegocio);

router.post('/editarnegocio/:id', negociosController.editUpdNegocio);

module.exports = router;