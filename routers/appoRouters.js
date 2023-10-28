const express = require('express');
const router = express.Router();

const {
    getAllAppoControl,
    appoByUserIdControl,
    createAppoControl,
    updateAppoControl,
    deleteAppoControl

} = require('../controllers/appoControllers')

//ROUTES

//All appointments
router.get('/', getAllAppoControl);

//Appointments By User ID
router.get('/:id', appoByUserIdControl);

//Create appointment
router.post('/', createAppoControl);

//Update appointment
router.put('/:id', updateAppoControl);

//Delete appointment
router.delete('/:id', deleteAppoControl);

module.exports = router;