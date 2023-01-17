const express = require('express');
const authController = require('../controllers/autenticacionController.js')
const router = express.Router()

router.get('/crearuser', authController.singUp);

router.post('/crearuser', authController.postSingUp);

router.get('/loginuser', authController.singIn);

router.post('/loginuser', authController.postSingIn);

router.get('/profile', authController.profile);

module.exports = router;