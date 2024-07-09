import express from "express";
import { createEmployee, removeEmployee } from "../controllers/ManagerController.js";

const managerRoutes = express.Router();

managerRoutes.post("/createEmployee", createEmployee);
managerRoutes.delete("/removeEmployee", removeEmployee);

export default managerRoutes;