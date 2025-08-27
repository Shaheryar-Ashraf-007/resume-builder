import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl:{ type: String, default: null}
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);