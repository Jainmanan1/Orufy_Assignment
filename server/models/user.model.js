import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,

      trim: true,
      lowercase: true,
      sparse: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);





export const User = mongoose.model("User", userSchema);