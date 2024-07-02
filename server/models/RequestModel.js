import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("request", requestSchema);
export default Request;
