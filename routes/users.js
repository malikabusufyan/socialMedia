const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

//Accessing the routers of sign in and sign Up
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//Creating the SignUp 
router.post('/create', usersController.create);

//Use Passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'users/sign-in'},
), usersController.createSession);

//To signout or Destroy the session
router.get('/sign-out', usersController.destroySession);

//Accessing google for signin and signUp

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sign-in'}), usersController.createSession);

module.exports = router;