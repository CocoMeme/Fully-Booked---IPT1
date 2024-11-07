const express = require('express');
const User = require('./user.model');
const router = express.Router();

const { loginAdmin, registerUser } = require('../users/user.controller.js');


router.post("/admin", loginAdmin)
router.post("/register", registerUser)

module.exports = router;