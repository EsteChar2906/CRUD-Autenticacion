const express = require('express');
const negociosController = require('../controllers/negociosController.js');
const db = require('../db.js');
const { isLoggedIn } = require('../lib/auth.js');
const router = express.Router();

router.get('/postnegocios', isLoggedIn, negociosController.getNegocios);

router.post('/postnegocios', isLoggedIn, negociosController.postNegocios);

router.get('/listnegocios', isLoggedIn, negociosController.listNegocios);

router.get('/deletenegocio/:id', isLoggedIn, negociosController.deleteNegocio);

router.get('/editarnegocio/:id', isLoggedIn, negociosController.editarNegocio);

router.post('/editarnegocio/:id', isLoggedIn, negociosController.editUpdNegocio);

router.get('/listnegocios/alluser', negociosController.listNegociosAllUser);

module.exports = router;