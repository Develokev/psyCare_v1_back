const express = require('express');
const router = express.Router();

const {
    getAllPatientsControl,
    getPatientByEmailControl,
    createPatientControl

} = require('../controllers/userControllers')

//ROUTES

//All Patientes - ADMIN
router.get('/', getAllPatientsControl);

//Patient By Email
router.get('/:email', getPatientByEmailControl);

//Create Patient
router.post('/', createPatientControl);

module.exports = router;