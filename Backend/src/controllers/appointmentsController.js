
const appointmentsController = {};

import appointmentsModel from "../models/appointments.js";

// SELECT
appointmentsController.getAppointments = async (req, res) => {
    const appointments = await appointmentsModel.find().populate('assignedDoctor').populate('assignedPatient');
    res.json(appointments);
};

// INSERT
appointmentsController.insertAppointment = async (req, res) => {
    const { date, time, reason, assignedDoctor, assignedPatient } = req.body;
    const newAppointment = new appointmentsModel({ date, time, reason, assignedDoctor, assignedPatient });
    await newAppointment.save();
    res.json({ message: "Appointment saved" });
};

// DELETE
appointmentsController.deleteAppointment = async (req, res) => {
    await appointmentsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
};

// UPDATE
appointmentsController.updateAppointment = async (req, res) => {
    const {date, time, reason, assignedDoctor, assignedPatient} = req.body;
    const updateAppointment = await appointmentsModel.findByIdAndUpdate(req.params.id,
        { date, time, reason, assignedDoctor, assignedPatient}, { new: true });
    res.json({ message: "Appointment updated successfully" });
};


export default appointmentsController;