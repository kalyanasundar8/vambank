import asyncHandler from "express-async-handler";
import Employee from "../models/EmployeeModel.js";
import Manager from "../models/ManagerModel.js";
import { generateEmployeeId } from "../services/EmployeeIdService.js";

// POST
// /api/manager/employee
const createEmployee = asyncHandler(async (req, res) => {
  const {
    branchId,
    firstName,
    lastName,
    position,
    dateOfJoining,
    age,
    dob,
    mobileNumber,
    email,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !position ||
    !dateOfJoining ||
    !age ||
    !dob ||
    !mobileNumber ||
    !email ||
    !address
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
    const numberExists = await Employee.findOne({ mobileNumber });
    const emailExists = await Employee.findOne({ email });

    if (numberExists) {
      res.status(400).json({ mssg: "Mobilenumber already exists" });
    }

    if (emailExists) {
      res.status(400).json({ mssg: "Email already exists" });
    }

    if (!numberExists && !emailExists) {
      const employee = await Employee.create({
        employeeId: generateEmployeeId(),
        branchId,
        firstName,
        lastName,
        position,
        dateOfJoining,
        age,
        dob,
        mobileNumber,
        email,
        address,
      });

      const manager = await Manager.findOne({ branchId });

      if (manager) {
        manager.employeeList.push(employee._id);
        await manager.save();
      }

      res.status(201).json({
        employeeId: employee._id,
        branchId: employee.branchId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        dateOfJoining: employee.dateOfJoining,
        age: employee.age,
        dob: employee.dob,
        mobileNumber: employee.mobileNumber,
        email: employee.email,
        address: employee.address,
      });
    }
  }
});

export { createEmployee };
