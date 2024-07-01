import express from "express";
import { createBranch, createManager } from "../controllers/FounderController.js";

const founderRoutes = express.Router();

founderRoutes.post("/createBranch", createBranch);
founderRoutes.post("/createManager", createManager);

export default founderRoutes;