import mongoose from "mongoose";

const accountBalanceSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
    balance: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const AccountBalance = mongoose.model("accountBalance", accountBalanceSchema);
export default AccountBalance;