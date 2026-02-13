import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { downloadCounterBillPDF } from "../controllers/pdf.js";

const router = express.Router();

// PDF download route - matches frontend call to /api/pdf/:counterId
router.get("/pdf/:counterId", authMiddleware, downloadCounterBillPDF);

export default router;
