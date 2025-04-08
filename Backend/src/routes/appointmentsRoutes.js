//este archivo sirve para definir que metoos del cud va atener mi ruta /api/appointments/ 

import express from "express";
import appointmentsController from "../controllers/appointmentsController.js";

const router = express.Router()

router.route("/").get(appointmentsController.getAppointments)
    .post(appointmentsController.insertAppointment)

router.route("/:id")
    .put(appointmentsController.updateAppointment)
    .delete(appointmentsController.deleteAppointment)

export default router;