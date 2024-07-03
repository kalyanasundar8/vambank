import express from "express";
import { createEmployee } from "../controllers/ManagerController.js";

const managerRoutes = express.Router();

managerRoutes.post("/createEmployee", createEmployee);

export default managerRoutes;