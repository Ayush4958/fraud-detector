import express from "express";
import cors from "cors";
import scanRoutes from "./routes/scan.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", scanRoutes);

export default app;
