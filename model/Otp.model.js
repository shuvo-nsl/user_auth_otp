import mongoose, { Schema } from "mongoose";
export const otpSchema = new mongoose.Schema({
    username:String,
    code: String
});

export default mongoose.model('Otp', otpSchema);