const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Working on MVC pattern
// @Controller - controllers/users
const usersController = require('../../controllers/users');

// @user model - /models/User
const User = require('../../models/User');


// @route GET api/users
// @desc Return a sample page  - the main /api/users - page
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), usersController.userHome );

// @route GET api/users/login
// @desc Return a login page
// @access Public
router.post('/login', usersController.POSTuserLogin);

// @route GET api/users/register
// @desc Return a register page
// @access Public
router.post('/register', usersController.POSTuserRegister);

// exporting the routers to the server.js middlewere
module.exports = router;