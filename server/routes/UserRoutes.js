import express from "express";
import { createUser, signinUser, verifyUser } from "../controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);
userRoutes.post("/verifyUser", verifyUser);
userRoutes.post("/signinUser", signinUser);

export default userRoutes;
