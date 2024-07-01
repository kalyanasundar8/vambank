import asyncHandler from "express-async-handler";
// Models
import Branch from "../models/BranchModel.js";
import Manager from "../models/ManagerModel.js";
import { generateEmployeeId } from "../services/EmployeeIdService.js";
import generateToken from "../services/GenerateToken.js";

// POST
// /api/founder/createBranches
const createBranch = asyncHandler(async (req, res) => {
  const { branchName, branchManagerId, address, location, pincode } = req.body;

  if (!branchName || !address || !location || !pincode) {
    res.status(400).json({ mssg: "Please fill all the fields" });
  }

  const branchExists = await Branch.findOne({ branchName });

  if (branchExists) {
    res.status(400).json({ mssg: "This branch already exists" });
  }

  if (!branchExists) {
    const branch = await Branch.create({
      branchName,
      address,
      location,
      pincode,
    });
  }
});

// POST
// /api/manager/createmanager
const createManager = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    dob,
    mobileNumber,
    email,
    address,
    dateOfJoining,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !age ||
    !dob ||
    !mobileNumber ||
    !email ||
    !address ||
    !dateOfJoining
  ) {
    res.status(400).json({ mssg: "Please fill all the fields" });
  }

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Enter a valid mobile number" });
  }

  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = emailFormat.test(email);

  if (!validEmail) {
    res.status(400).json({ mssg: "Enter a valid email" });
  }

  if (validMobNumber && validEmail) {
    const numberExists = await Manager.findOne({ mobileNumber });
    const emailExists = await Manager.findOne({ email });

    if (numberExists) {
      res.status(400).json({ mssg: "Mobilenumber already exists" });
    }

    if (emailExists) {
      res.status(400).json({ mssg: "Email already exists" });
    }

    if (!numberExists && !emailExists) {
      const manager = await Manager.create({
        employeeId: generateEmployeeId(),
        firstName,
        lastName,
        position: "Manager",
        age,
        dob,
        mobileNumber,
        email,
        address,
        dateOfJoining,
        branchId: null,
      });

      res.status(201).json({
        id: manager._id,
        employeeId: manager.employeeId,
        firstName: manager.firstName,
        age: manager.age,
        dob: manager.dob,
        mobileNumber: manager.mobileNumber,
        email: manager.email,
        address: manager.address,
        dateOfJoining: manager.dateOfJoining,
        branchId: manager.branchId,
        token: generateToken(manager._id)
      })
    }
  }
});

export { createBranch, createManager };
