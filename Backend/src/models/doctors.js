/*
Fields:
 name
 email
 password.
 specialty

*/

import { Schema, model } from "mongoose";

const doctorsSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "The name is required"]
      },
      email: {
         type: String,
         required: [true, "The email is required"],
         unique: true,
         validate: {
            validator: function (v) {
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
         }
      },
      password: {
         type: String,
         required: [true, "password is required"],
         minlength: [6, "password must be at least 6 characters long"]
      },
      specialty: {
         type: String,
         required: [true, "The Specialty is required"]
      }
   },
   {
      timestamps: true,
      strict: false,
   }
)

export default model("doctors", doctorsSchema);