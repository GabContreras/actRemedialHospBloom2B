/*
Fields:
 date, time, reason, assigned doctor, assigned patient.
*/

import { Schema, model } from "mongoose";

const appointmentsSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        assignedDoctor: {
            type: Schema.Types.ObjectId,
            ref: "doctors",
            required: true,
        },
        assignedPatient: {
            type: Schema.Types.ObjectId,
            ref: "patients",
            required: true,
        }
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("appointments", appointmentsSchema);