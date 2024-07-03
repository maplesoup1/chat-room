const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Login_Signup.controller');
router.post('/', (req, res) => {
    UserController.Signup(req, res);
});

module.exports = router;