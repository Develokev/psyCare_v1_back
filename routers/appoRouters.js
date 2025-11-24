/**
 * Módulo que define las rutas relacionadas con la gestión de citas (appointments).
 * @module routes/appoRouters
 */
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");
const { validateJWT } = require("../middlewares/validateJWT");

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

/** Obtiene todos las las citas bajo un determinado "status" */
router.get("/status", validateJWT, appoByStatusControl);

/** Obtiene todas las citas bajo un determinado "status", pero también bajo un determinado usuario(user_id)*/
router.get("/status/:id", validateJWT, appoByStatusByUserControl);

/** Cambia el estado(status) de una cita a través de su appo_id (ID de la cita)
 * @middlewares
 * - Validaciones de entrada utilizando Express Validator.
 * @param {string} status.body.required - Nuevo estado de la cita.
 */
router.put(
  "/status",
  [
    validateJWT,
    check("status", "Debes elegir que tipo de cita quieres agendar")
      .trim()
      .notEmpty(),
    validateInputs,
  ],
  changeStatusControl
);

/** Obtiene todas las citas */
router.get("/", validateJWT, getAllAppoControl);

/** Obtiene todas las citas bajo un determinado usuario (user_id) */
router.get("/:id", validateJWT, appoByUserIdControl);

/**DOCS
 * Crea una nueva cita
 * @middlewares
 * - Validaciones de entrada utilizando Express Validator.
 * @param {string} appoDate.body.required - Fecha de la cita.
 * @param {string} appoTime.body.required - Hora de la cita.
 * @param {string} appoType.body.required - Tipo de cita ("face-to-face" u "online").
 */
router.post(
  "/",
  [
    validateJWT,
    check("appoDate", "Debes elegir la fecha de la cita que quisieras agendar")
      .trim()
      .notEmpty(),
    check("appoTime", "Debes elegir la hora de la cita que te gustaría agendar")
      .trim()
      .notEmpty(),
    check(
      "appoType",
      'Elige por favor "face-to-face" para cita presencial, u "online" si la prefieres en línea'
    )
      .trim()
      .notEmpty(),
    validateInputs,
  ],
  createAppoControl
);

/**DOCS
 * Actualiza una nueva cita
 * @middlewares
 * - Validaciones de entrada utilizando Express Validator.
 * @param {string} appoDate.body.required - Fecha de la cita.
 * @param {string} appoTime.body.required - Hora de la cita.
 * @param {string} appoType.body.required - Tipo de cita ("face-to-face" u "online").
 */
router.put(
  "/:id",
  [
    validateJWT,
    check("appoDate", "Debes elegir la fecha de la cita que quisieras agendar")
      .trim()
      .notEmpty(),
    check("appoTime", "Debes elegir la hora de la cita que te gustaría agendar")
      .trim()
      .notEmpty(),
    check(
      "appoType",
      'Elige por favor "face-to-face" para cita presencial, u "online" si la prefieres en línea'
    )
      .trim()
      .notEmpty(),
    validateInputs,
  ],
  updateAppoControl
);

/** Elimina una cita por su ID */
router.delete("/:id", validateJWT, deleteAppoControl);

module.exports = router;
