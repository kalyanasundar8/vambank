import asyncHandler from "express-async-handler";
// Models
import Branch from "../models/BranchModel.js";
import Manager from "../models/ManagerModel.js";
import { generateEmployeeId } from "../services/EmployeeIdService.js";
import generateToken from "../services/GenerateToken.js";
import { sendSMS } from "../services/Notification.js";

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
      branchManagerId: branchManagerId ? branchManagerId : null,
      address,
      location,
      pincode,
    });

    if (branch.branchManagerId) {
      await Manager.findByIdAndUpdate(branch.branchManagerId, {
        branchId: branch._id,
      });
    }

    res.status(201).json({
      branchName: branch.branchName,
      branchManagerId: branch.branchManagerId,
      address: branch.address,
      location: branch.location,
      pincode: branch.pincode,
      token: generateToken(branch._id),
    });
  } else {
    res.status(400).json({ mssg: "Something went wrong" });
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
    branchId,
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
    return res.status(400).json({ mssg: "Please fill all the fields" });
  }

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    return res.status(400).json({ mssg: "Enter a valid mobile number" });
  }

  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = emailFormat.test(email);

  if (!validEmail) {
    return res.status(400).json({ mssg: "Enter a valid email" });
  }

  const branchExists = await Branch.findOne({ _id: branchId });

  if (!branchExists) {
    return res.status(400).json({ mssg: "Branch not exists" });
  }

  if (validMobNumber && validEmail) {
    const numberExists = await Manager.findOne({ mobileNumber });
    const emailExists = await Manager.findOne({ email });

    if (numberExists) {
      return res.status(400).json({ mssg: "Mobilenumber already exists" });
    }

    if (emailExists) {
      return res.status(400).json({ mssg: "Email already exists" });
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
        branchId: branchId ? branchId : null,
      });

      if (branchId) {
        await Branch.findByIdAndUpdate(branchId, {
          branchManagerId: manager._id,
        });
      }

      const sms = await sendSMS(
        mobileNumber,
        "Manager",
        manager.firstName,
        manager.employeeId
      );
      return res.status(201).json({
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
        token: generateToken(manager._id),
      });
    }
  }
});

const removeManager = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const managerExists = await Manager.findOne({ _id: id });

  if (managerExists) {
    await Manager.findByIdAndDelete({ _id: id });
    await Branch.updateOne(
      { _id: managerExists.branchId },
      { $unset: { branchManagerId: "" } }
    );
    res.status(200).json({ mssg: `Manager (${id}) deleted` });
  } else {
    res.status(400).json({ mssg: `There is no managers in this ID:${id}` });
  }
});

export { createBranch, createManager, removeManager };
