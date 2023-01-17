const express = require('express');
const authController = require('../controllers/autenticacionController.js')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');
const router = express.Router()

router.get('/crearuser', isNotLoggedIn, authController.singUp);

router.post('/crearuser', authController.postSingUp);

router.get('/loginuser', isNotLoggedIn, authController.singIn);

router.post('/loginuser', authController.postSingIn);

router.get('/profile', isLoggedIn, authController.profile);

router.get('/logout', isLoggedIn, authController.logout);

module.exports = router;