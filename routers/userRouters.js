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

//ROUTES

//all Patientes - ADMIN
router.get('/', getAllPatientsControl);

//patient by email
router.get('/:email', getPatientByEmailControl);

//create patient
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

//delete patient
router.delete('/:id', deletePatientControl);

//update patient
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

module.exports = router;