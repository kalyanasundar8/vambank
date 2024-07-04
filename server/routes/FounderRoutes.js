import express from "express";
import { createBranch, createManager, removeManager } from "../controllers/FounderController.js";

const founderRoutes = express.Router();

founderRoutes.post("/createBranch", createBranch);
founderRoutes.post("/createManager", createManager);
founderRoutes.delete("/removeManager", removeManager);

export default founderRoutes;