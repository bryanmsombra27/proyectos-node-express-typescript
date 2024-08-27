import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  email: string;
  password: string;
  name: string;
  confirmed: boolean;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>("User", UserSchema);

export default User;
