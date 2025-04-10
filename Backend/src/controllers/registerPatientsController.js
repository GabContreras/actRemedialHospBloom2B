import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import patientsModel from "../models/patients.js";
import { config } from "../config.js";

const registerPatientsController = {};

// Register a new patient
registerPatientsController.register = async (req, res) => {
    const {
        name, email, password, birthday, phone, isVerified
    } = req.body;

    try {
        // Verifico si el paciente ya existe
        const existingPatient = await patientsModel.findOne({ email });
        if (existingPatient) {
            return res.json({ message: "El paciente ya existe" });
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Guardo al paciente en la base de datos
        const newPatient = new patientsModel({
            name, email, password: passwordHash, birthday, phone, isVerified: isVerified || false,
        });

        await newPatient.save();


        //Generar un codigo aleatorio para enviarlo por correo
        const verificationcode = crypto.randomBytes(3).toString("hex");

        //Generar un token que contenga el codigo de verificacion
        const tokenCode = jsonwebtoken.sign(
            //1- ¿Qué voy a guardar?
            { email, verificationcode },
            //2- Secret key
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: "2h" }
        );

        res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        //Enviar el correo electronico
        //1- Transporter => quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass,
            },
        });

        //2- mailoption => quien lo recibe
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificación de correo - Bryan's hospital",
            text:
                "Para verificar tu cuenta de paciente utiliza el siguiente código: " +
                verificationcode +
                "\nEl código expira en dos horas",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4a90e2;">Verificación de cuenta de paciente</h2>
          <p>Estimado(a) ${name},</p>
          <p>Gracias por registrarte en nuestro sistema médico. Para completar tu registro, por favor utiliza el siguiente código de verificación:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
            ${verificationcode}
          </div>
          <p>Este código expirará en 2 horas.</p>
          <p>Si no has solicitado esta cuenta, puedes ignorar este correo.</p>
          <p>Saludos,<br>El equipo del Sistema Bryan</p>
        </div>
      `,
        };

        // 3- Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ message: "Error al enviar el correo: " + error });
            }
            console.log("Correo enviado: " + info.response);
        });

        res.json({
            message: "Paciente registrado. Por favor verifica tu correo con el código enviado",
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};

// Verify email with code
registerPatientsController.verifyCodeEmail = async (req, res) => {
    const { requireCode } = req.body;

    const token = req.cookies.verificationToken;

    try {
        //Verificar y decodificar el tokenf
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;

        //Comparar el codigo que envie por correo y esta guardado en las cookies, con el codigo que el usuario esta ingresando
        if (requireCode !== storedCode) {
            return res.json({ message: "Invalid code" });
        }

        //Marcamos al paciente como verificado
        const client = await clientsModel.findOne({ email });
        client.isVerified = true;
        await client.save();


        res.clearCookie("verificationToken");

        res.json({ message: "Email verified Successfully" });



    } catch (error) {
        console.log("error" + error);
    }
};

export default registerPatientsController;