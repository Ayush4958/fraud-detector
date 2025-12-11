// src/routes/counterBill.routes.js
import { Router } from "express";
import { authMiddleware} from "../middlewares/auth.js";
import { generateCounterBill } from "../controllers/counter.js";

const router = Router();

// POST /api/counter-bill/:scanId
router.post("/counter-bill/:scanId", authMiddleware , generateCounterBill);

export default router;
