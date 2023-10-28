const express = require('express');
const router = express.Router();

const {
    getAllAppoControl,
    appoByUserIdControl,
    createAppoControl

} = require('../controllers/appoControllers')

//ROUTES

//All appointments
router.get('/', getAllAppoControl);

//Appointment By ID
router.get('/:id', appoByUserIdControl);

//Create appointment
router.post('/', createAppoControl);

module.exports = router;