import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    position: {
      tpye: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: true,
    },
    dob: {
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
    dateOfJoining: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Manager = mongoose.model("manager", managerSchema);
export default Manager;
