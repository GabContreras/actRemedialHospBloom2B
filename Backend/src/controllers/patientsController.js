
const patientsController = {};

import patientsModel from "../models/patients.js";

// SELECT
patientsController.getPatients = async (req, res) => {
    const patients = await patientsModel.find();
    res.json(patients);
};

// INSERT
patientsController.insertPatients = async (req, res) => {
    const { name, email, password, birthday, phone, isVerified } = req.body;
    const newDoctor = new patientsModel({ name, email, password, birthday, phone, isVerified });
    await newDoctor.save();
    res.json({ message: "Patient saved" });
};

// DELETE
patientsController.deletePatients = async (req, res) => {
    await patientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
};

// UPDATE
patientsController.updatePatients = async (req, res) => {
    const { name, email, password, birthday, phone, isVerified } = req.body;
    const updateDoctors = await patientsModel.findByIdAndUpdate(req.params.id,
        { name, email, password, birthday, phone, isVerified }, { new: true });
    res.json({ message: "Patient updated successfully" });
};


export default patientsController;