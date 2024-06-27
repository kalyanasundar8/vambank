import express from "express";
import dotenv from "dotenv";
dotenv.config();
import parser from "body-parser";
import cors from "cors";
import colors from "colors";

// Custom Modules
import MDBC from "./config/config.js";
import userRoutes from "./routes/UserRoutes.js";

// Server
const server = express();

server.use(cors());

// PDBC
MDBC();
server.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});
// Middlewares
server.use(parser.json());
server.use(parser.urlencoded({ extended: true }));

// Port
const port = process.env.PORT;

// Routes
server.use("/api/users", userRoutes);

// Server listening to the port
server.listen(port, () => {
  console.log(`Server listening port ${port}`.blue);
});
