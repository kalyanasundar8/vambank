import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { sendSMS } from "../services/Notification.js";
import generateToken from "../services/GenerateToken.js";
import jwt from "jsonwebtoken";

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
      const sms = await sendSMS(mobileNumber);
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

export { createUser, verifyUser };
