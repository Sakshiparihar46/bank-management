import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";

connectDB();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);

app.listen(port, () => console.log("Server running"));