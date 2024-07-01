import mongoose from "mongoose";
const transactionHistorySchema = new mongoose.Schema({
    transactionType: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const TransactionHistory = mongoose.model("transactionHistorie", transactionHistorySchema);
export default TransactionHistory;