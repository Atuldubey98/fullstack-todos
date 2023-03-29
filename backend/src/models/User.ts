import { Schema, model } from "mongoose";
import IUser from "../interfaces/IUser";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("user", userSchema);

export default User;
