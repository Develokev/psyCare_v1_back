const express = require("express");
const router = express.Router();
const {loginController} = require('../controllers/authControllers')

//Authenticaion ROUTES

//Login
router.get("/login", loginController);

module.exports = router;