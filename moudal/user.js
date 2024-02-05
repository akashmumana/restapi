
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const regSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },

}, { timestamps: true })
export default mongoose.model('regdata', regSchema)