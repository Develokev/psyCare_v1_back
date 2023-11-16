/**
 * Módulo que define las rutas relacionadas con la gestión de authorización de usuario.
 * @module routes/authRouters
 */
const express = require("express");
const router = express.Router();

const {check} = require('express-validator');
const {loginController} = require('../controllers/authControllers');
const { validateInputs } = require("../middlewares/validateInputs");

/**
 * Rutas relacionadas con la gestión de autorización.
 * @name AuthRoutes
 * @namespace
 * @group Authorization Management
 */

/**DOCS 
 * Realiza la autentificación del usuario. 
 * @middlewares
 *   - Validaciones de entrada utilizando Express Validator.
 * @handler {Function} loginController - Controlador para la autenticación del usuario.
 * @param {string} email.body.required - Correo electrónico del usuario.
 * @param {string} password.body.required - Contraseña del usuario.
 */
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