const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

//Accessing the routers of sign in and sign Up
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//Creating the SignUp 

router.post('/create', usersController.create);

module.exports = router;