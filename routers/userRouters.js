/**
 * Módulo que define las rutas relacionadas con la gestión de pacientes (usuarios).
 * @module routes/userRouters
 */
const express = require('express');
const router = express.Router();

const {check} = require('express-validator');
const {validateInputs} = require('../middlewares/validateInputs');
const {checkEmail} = require('../middlewares/emailExist');
const {encryptPass} = require('../middlewares/encryptOnly')

const {
    getAllPatientsControl,
    getPatientByEmailControl,
    createPatientControl,
    deletePatientControl,
    updatePatientControl

} = require('../controllers/userControllers')

/** Obtiene todos los pacientes - ADMIN ONLY */
router.get('/', getAllPatientsControl);

/** Obtiene un paciente por su dirección de correo electrónico */
router.get('/:email', getPatientByEmailControl);

/**DOCS
 * Crea un nuevo paciente.
 * @middlewares
 * - Validaciones de entrada utilizando Express Validator.
 * - Verificación de existencia de correo electrónico utilizando "emailExist" middleware.
 * @param {string} name.body.required - Nombre del paciente.
 * @param {string} last_name.body.required - Apellido del paciente.
 * @param {string} email.body.required - Correo electrónico del paciente.
 * @param {string} password.body.required - Contraseña del paciente.
 */
router.post('/', [
    check('name', 'El nombre es obligatorio.').trim().notEmpty(),
    check('last_name', 'El apellido es obligatorio.').trim().notEmpty(),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria y debe tener entre 6 y 12 caracteres, y al menos un número y una letra.')
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/),
    validateInputs,
    checkEmail,
], createPatientControl);

/**DOCS
 * Actualiza los datos de un paciente por su ID.
 * @middlewares
 * @param {string} id.path.required - ID del paciente.
 * @param {string} name.body.required - Nuevo nombre del paciente.
 * @param {string} last_name.body.required - Nuevo apellido del paciente.
 * @param {string} password.body.required - Nueva contraseña del paciente.
 */
router.put('/:id', [
    check('name', 'El nombre es obligatorio.').trim().notEmpty(),
    check('last_name', 'El apellido es obligatorio.').trim().notEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener entre 6 y 12 caracteres, y al menos un número y una letra.')
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/),
    validateInputs,
    encryptPass,
], updatePatientControl);

/** Elimina un paciente por su ID */
router.delete('/:id', deletePatientControl);

module.exports = router;