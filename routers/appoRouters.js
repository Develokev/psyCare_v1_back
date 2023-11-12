const express = require("express");
const router = express.Router();

const {check} = require('express-validator');
const {validateInputs} = require('../middlewares/validateInputs');

const {
  getAllAppoControl,
  appoByUserIdControl,
  createAppoControl,
  updateAppoControl,
  deleteAppoControl,
  appoByStatusControl,
  appoByStatusByUserControl,
  changeStatusControl,
} = require("../controllers/appoControllers");

//Appointments ROUTES

//Appointments by status
router.get("/status", appoByStatusControl);

//Apointments by status by user
router.get("/status/:id", appoByStatusByUserControl);

//Change appointment status
router.put("/status", [
  check('status', 'Debes elegir que tipo de cita quieres agendar').trim().notEmpty(),
  validateInputs
], changeStatusControl);

//CRUD +++++++++++++++
//All appointments
router.get("/", getAllAppoControl);

//Appointments By User ID
router.get("/:id", appoByUserIdControl);

//Create appointment
router.post("/", [
  check('appoDate', 'Debes elegir la fecha de la cita que quisieras agendar').trim().notEmpty(),
  check('appoTime', 'Debes elegir la hora de la cita que te gustaría agendar').trim().notEmpty(),
  check('appoType', 'Elige por favor "face-to-face" para cita presencial, u "online" si la prefieres en línea').trim().notEmpty(),
  validateInputs
], createAppoControl);

//Update appointment by appo_id
router.put("/:id", [
  check('appoDate', 'Debes elegir la fecha de la cita que quisieras agendar').trim().notEmpty(),
  check('appoTime', 'Debes elegir la hora de la cita que te gustaría agendar').trim().notEmpty(),
  check('appoType', 'Elige por favor "face-to-face" para cita presencial, u "online" si la prefieres en línea').trim().notEmpty(),
  validateInputs
], updateAppoControl);

//Delete appointment bu appo_id
router.delete("/:id", deleteAppoControl);

module.exports = router;
