/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
  email: { type: String, require: [true, "Email is Reqquired"] },
  first_name: { type: String, require: [true, "First Name is Reqquired"] },
  last_name: { type: String, require: [true, "Last Name is Reqquired"] },
  avatar: { type: String, require: [true, "Avatar is Reqquired"] },
});

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
