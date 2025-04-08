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


//Create a new express app instance 
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());


app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);

//Define the port for the server
export default app;