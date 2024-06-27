import express from "express";
import { createUser, verifyUser } from "../controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);
userRoutes.post("/verifyUser", verifyUser);

export default userRoutes;
