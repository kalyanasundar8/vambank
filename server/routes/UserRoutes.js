import express from "express";
import { createUser } from "../controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", createUser);

export default userRoutes;