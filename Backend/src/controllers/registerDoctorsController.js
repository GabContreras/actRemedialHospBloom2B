import DoctorModel from "../models/doctors.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerDoctorsController = {};

registerDoctorsController.register = async (req, res) => {
    const { 
        name, email, password, specialty
    } = req.body;
    
    try {
        //Verificamos si el doctor ya existe
        const existsDoctor = await DoctorModel.findOne({ email });
        if (existsDoctor) {
            return res.json({ message: "El doctor ya existe" });
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);
        
        //Crear un nuevo doctor
        const newDoctor = new DoctorModel({ 
            name, email, password: passwordHash, specialty         
        });
        
        await newDoctor.save();
        
        //--> TOKEN <--
        jsonwebtoken.sign(
            //1- Que voy a guardar
            { id: newDoctor._id },
            //2-secreto 
            config.JWT.secret,
            //3- cuándo expira
            { expiresIn: config.JWT.expiresIn },
            //4- función flecha
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({ message: "Doctor registrado exitosamente" });
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar el doctor" });
    }
};

export default registerDoctorsController;