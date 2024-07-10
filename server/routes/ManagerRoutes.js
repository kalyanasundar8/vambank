import express from "express";
import { createEmployee, employee, employees, removeEmployee } from "../controllers/ManagerController.js";

const managerRoutes = express.Router();

managerRoutes.post("/createEmployee", createEmployee);
managerRoutes.delete("/removeEmployee", removeEmployee);
managerRoutes.get("/employees", employees);
managerRoutes.get("/employee", employee);

export default managerRoutes;