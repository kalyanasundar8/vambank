import mongoose from "mongoose";

const accountsSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    address: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    accountHolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    accountBalance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accountBalance",
    },
    transactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transactionHistorie",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("account", accountsSchema);
export default Account;
