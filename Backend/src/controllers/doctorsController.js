
const doctorsController = {};

import doctorsModel from "../models/doctors.js";

// SELECT
doctorsController.getDoctors = async (req, res) => {
    const doctors = await doctorsModel.find();
    res.json(doctors);
};

// INSERT
doctorsController.insertDoctors = async (req, res) => {
    const { name, email, password, specialty } = req.body;
    const newDoctor = new doctorsModel({ name, email, password, specialty });
    await newDoctor.save();
    res.json({ message: "Doctor saved" });
};

// DELETE
doctorsController.deleteDoctors = async (req, res) => {
    await doctorsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
};

// UPDATE
doctorsController.updateDoctors = async (req, res) => {
    const { name, email, password, specialty } = req.body;
    const updateDoctors = await doctorsModel.findByIdAndUpdate(req.params.id,
        { name, email, password, specialty }, { new: true });
    res.json({ message: "Doctor updated successfully" });
};


export default doctorsController;