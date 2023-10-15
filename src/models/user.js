import { models } from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    contactInfo: {
      phone: String,
      email: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Doctor", "Nurse", "Pharmacist"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = models.User || new model("User", userSchema);
export default User;
