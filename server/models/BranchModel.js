import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
    },
    branchManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager"
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Branch = mongoose.model("branche", branchSchema);
export default Branch;