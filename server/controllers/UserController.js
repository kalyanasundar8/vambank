import asyncHandler from "express-async-handler";
// Password hashing
import bcrypt from "bcryptjs";
// Services
import generateToken from "../services/GenerateToken.js";
import { sendSMS } from "../services/Notification.js";
// Jsonwebtoken
import jwt from "jsonwebtoken";
// Models
import User from "../models/UserModel.js";
import Account from "../models/AccountModel.js";
import Request from "../models/RequestModel.js";
import Employee from "../models/EmployeeModel.js";

// Method:  POST
// Route:   /api/users/createuser
const createUser = asyncHandler(async (req, res) => {
  const { userName, mobileNumber, password, confirmPassword } = req.body;

  // Check all fields are entered
  if (!userName || !mobileNumber || !password || !confirmPassword) {
    res.status(400).json({ mssg: "Please fill all the required fields" });
  }

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  if (validMobNumber) {
    // Check mobile number exists
    const numberExists = await User.findOne({ mobileNumber });

    if (numberExists !== null) {
      res.status(400).json({ mssg: "Mobile number already exists" });
    }

    if (numberExists === null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a user
      const user = await User.create({
        userName,
        mobileNumber,
        password: hashedPassword,
      });
      const sms = await sendSMS(mobileNumber, "User", user.userName);
      res.status(201).json({
        id: user._id,
        username: user.userName,
        mobilenumber: user.mobileNumber,
        token: generateToken(user._id),
      });
    }
  }
});

// Method:  POST
// Route:   /api/users/verifyUser
const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ mssg: "There is no token" });
  }

  const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

  const userExists = await User.findOne({ _id: decodedToken.id });

  if (userExists) {
    res.status(200).json({
      Id: userExists._id,
      Username: userExists.userName,
      Mobilenumber: userExists.mobileNumber,
      verificationStatus: true,
    });
  } else {
    res.status(400).json({
      verificationStatus: false,
    });
  }
});

// Method:  POST
// Route:   /api/users/signinUser
const signinUser = asyncHandler(async (req, res) => {
  const { mobileNumber, userPassword } = req.body;

  if (!mobileNumber || !userPassword) {
    res.status(400).json({ mssg: "Please fill all the fields" });
  }

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  if (validMobNumber) {
    const numberExists = await User.findOne({ mobileNumber });

    if (
      numberExists &&
      (await bcrypt.compare(userPassword, numberExists.password))
    ) {
      res.status(200).json({
        token: generateToken(numberExists._id),
      });
    } else {
      res.status(400).json({ mssg: "Number not exists" });
    }
  } else {
    res.status(400).json({ mssg: "Please a enter a valid mobilenumber" });
  }
});

// Method:  POST
// Route:   /api/users/accountRequest
const sendAccountRequest = asyncHandler(async (req, res) => {
  const {
    userId,
    userName,
    fatherName,
    motherName,
    mobileNumber,
    email,
    address,
    aadharNumber,
    branchId,
    accountType,
  } = req.body;

  if (
    !userId ||
    !userName ||
    !fatherName ||
    !motherName ||
    !mobileNumber ||
    !email ||
    !address ||
    !aadharNumber ||
    !branchId ||
    !accountType
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

  const aadharFormat = /^\d{12}$/;
  const validAadhar = aadharFormat.test(aadharNumber);

  if (!validAadhar) {
    res.status(400).json({ mssg: "Enter a valid aadharnumber" });
  }

  const [mobileNumberExists, emailExists, aadharExists] = await Promise.all([
    Request.findOne({ mobileNumber }),
    Request.findOne({ email }),
    Request.findOne({ aadharNumber }),
  ]);

  if (mobileNumberExists || emailExists || aadharExists) {
    const existingFields = [];
    if (mobileNumberExists) existingFields.push("Mobilenumber");
    if (emailExists) existingFields.push("Email");
    if (aadharExists) existingFields.push("Aadharnumber");

    res
      .status(400)
      .json({ mssg: `${existingFields.join(", ")} already exists` });
  } else {
    const request = await Request.create({
      userId,
      userName,
      fatherName,
      motherName,
      mobileNumber,
      email,
      address,
      aadharNumber,
      branchId,
      accountType,
    });

    // const user = await Request.findOne({ _id: request.userId });

    // if (user) {
    //   res
    //     .status(400)
    //     .json({
    //       mssg: "You already requested for account creation, please wait for our response",
    //     });
    // }

    // const employee = await Employee.findOne({ branchId });

    // if (employee.branchId == branchId && employee.position === "Clerk") {
    //   employee.accountRequest.push(request._id);
    //   await employee.save();
    // } else {
    //   res.status(400).json({ mssg: "There is no employee in this branch" });
    // }

    res.status(201).json({
      id: request._id,
      userId: request.userId,
      fatherName: request.fatherName,
      motherName: request.motherName,
      mobileNumber: request.mobileNumber,
      email: request.email,
      address: request.address,
      aadharNumber: request.aadharNumber,
      branchId: request.branchId,
      accountType: request.accountType,
    });
  }
});

export { createUser, verifyUser, signinUser, sendAccountRequest };
