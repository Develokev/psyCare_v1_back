const express = require("express");
const router = express.Router();

const {check} = require('express-validator');
const {loginController} = require('../controllers/authControllers');
const { validateInputs } = require("../middlewares/validateInputs");

//Authenticaion ROUTES

//Login
router.get("/login", [
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria y debe tener entre 6 y 12 caracteres, y al menos un número y una letra.')
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/),
    validateInputs,
], loginController);

module.exports = router;