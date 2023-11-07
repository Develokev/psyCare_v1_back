const express = require('express');
const router = express.Router();

const {
    getAllPatientsControl,
    getPatientByEmailControl,
    createPatientControl,
    deletePatientControl,
    updatePatientControl

} = require('../controllers/userControllers')

const {checkEmail} = require('../middlewares/emailExist')

//ROUTES

//all Patientes - ADMIN
router.get('/', getAllPatientsControl);

//patient by email
router.get('/:email', getPatientByEmailControl);

//create patient
router.post('/', checkEmail, createPatientControl);

//delete patient
router.delete('/:id', deletePatientControl);

//update patient
router.put('/:id', updatePatientControl);

module.exports = router;