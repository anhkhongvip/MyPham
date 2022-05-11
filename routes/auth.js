const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController");

router.post('/register', AccountController.register) 

router.post('/login', AccountController.login) 

router.get('/logout', AccountController.logout) 

module.exports = router;