// routes/bankRoutes.js
import express from "express";
import { deposit, withdraw, getTransactions } from "../controllers/bankController.js";
import auth from "../middleware/auth.js";
import { makePayment } from "../controllers/bankController.js";
import { getBalance } from "../controllers/bankController.js";


const router = express.Router();

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.get("/transactions", auth, getTransactions);
router.post("/pay", auth, makePayment);
router.get("/balance", auth, getBalance);

export default router;