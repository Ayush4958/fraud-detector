import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { scanDocument } from "../controllers/scan.js";
import { authMiddleware} from "../middlewares/auth.js";

const router = Router();

router.post("/scan", authMiddleware , upload.single("file"), scanDocument);

export default router;
