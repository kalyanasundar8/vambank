import mongoose from "mongoose";

const founderSchema = new mongoose.Schema(
  {
    branchList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branche",
    },
    managerList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "manager",
    },
    totalBankBalance: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Founder = mongoose.model("founder", founderSchema);
export default Founder;
