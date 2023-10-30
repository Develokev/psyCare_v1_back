const express = require("express");
const router = express.Router();

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
router.put("/status", changeStatusControl);

//CRUD +++++++++++++++
//All appointments
router.get("/", getAllAppoControl);

//Appointments By User ID
router.get("/:id", appoByUserIdControl);

//Create appointment
router.post("/", createAppoControl);

//Update appointment by appo_id
router.put("/:id", updateAppoControl);

//Delete appointment bu appo_id
router.delete("/:id", deleteAppoControl);

module.exports = router;
