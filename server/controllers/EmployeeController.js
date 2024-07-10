import asyncHandler from "express-async-handler";
import Account from "../models/AccountModel";

// Method   GET
// Route    /api/employee/getAllRequest
const requests = asyncHandler(async (req, res) => {
  const { branchId } = req.query;

  const accountRequests = await Account.find({ branchId });
  console.log(accountRequests);
});

// Method   POST
// Route    /api/employee/sendAccountRequest
const sendAccountRequest = asyncHandler(async (req, res) => {
  const { accRequestId } = req.query;

  const requestExists = await Account.findById({ accRequestId });
  console.log();
});

export { requests };
