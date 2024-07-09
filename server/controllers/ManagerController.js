import asyncHandler from "express-async-handler";
import Employee from "../models/EmployeeModel.js";
import Manager from "../models/ManagerModel.js";
import { generateEmployeeId } from "../services/EmployeeIdService.js";
import Branch from "../models/BranchModel.js";

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
    const numberExists = await Employee.findOne({ mobileNumber });
    const emailExists = await Employee.findOne({ email });

    if (numberExists) {
      return res.status(400).json({ mssg: "Mobilenumber already exists" });
    }

    if (emailExists) {
      return res.status(400).json({ mssg: "Email already exists" });
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

      return res.status(201).json({
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

const removeEmployee = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const employeeExists = await Employee.findOne({ _id: id });

  if (employeeExists) {
    await Employee.findByIdAndDelete({ _id: id });
    const mana = await Manager.updateOne(
      { branchId: employeeExists.branchId },
      { $pull: { employeeList:id } }
    );
    console.log(mana);
    res.status(200).json({ mssg: `Employee (${id}) deleted` });
  } else {
    res.status(400).json({ mssg: `There is no employee in this ID:${id}` });
  }
});

export { createEmployee, removeEmployee };
