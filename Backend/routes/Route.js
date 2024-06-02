import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
const Route = Router();
Route.use("/user",userRoutes);
Route.use("/auth", authRoutes);

export default Route;
