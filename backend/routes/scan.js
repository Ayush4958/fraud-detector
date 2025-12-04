import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { scanDocument } from "../controllers/scan.js";

const router = Router();

router.post("/scan", upload.single("file"), scanDocument);

export default router;
