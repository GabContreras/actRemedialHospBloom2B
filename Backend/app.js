/**
*Doctors
*Patients  
*Appointments
*/

//import necessary modules
import express from 'express';
import cookieParser from "cookie-parser";

import doctorsRoutes from './src/routes/doctorsRoutes.js';
import patientsRoutes from './src/routes/patientsRoutes.js';
import appointmentsRoutes from './src/routes/appointmentsRoutes.js';
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerPatientsRoutes from "./src/routes/registerPatientsRoutes.js";
import registerDoctorsRoutes from "./src/routes/registerDoctorsRoutes.js";



//Create a new express app instance 
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());


app.use("/api/doctors/", doctorsRoutes);
app.use("/api/patients/", patientsRoutes);
app.use("/api/appointments/", appointmentsRoutes);
app.use("/api/login/", loginRoutes);
app.use("/api/logout/", logoutRoutes);
app.use("/api/registerDoctors/",registerDoctorsRoutes);
app.use("/api/registerPatients/", registerPatientsRoutes)

//Define the port for the server
export default app;