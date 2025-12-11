import express from "express";
import { authMiddleware} from "../middlewares/auth.js";
import { downloadCounterBillPDF } from "../controllers/pdf.js";

const router = express.Router();

router.get("/counter-bill/pdf/:counterBillId", downloadCounterBillPDF);

export default router;
