const express = require('express');
const router = express.Router();

const {
    getAllAppoControl,
    appoByUserIdControl,
    createAppoControl,
    updateAppoControl

} = require('../controllers/appoControllers')

//ROUTES

//All appointments
router.get('/', getAllAppoControl);

//Appointment By ID
router.get('/:id', appoByUserIdControl);

//Create appointment
router.post('/', createAppoControl);

//Update appointment
router.put('/:id', updateAppoControl);

module.exports = router;