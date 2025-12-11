import express from "express";
import cors from "cors";
import scanRoutes from "./routes/scan.js";
import counterRoutes from "./routes/counter.js";
import pdfRoutes from "./routes/pdf.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", scanRoutes);
app.use("/api", counterRoutes);
app.use("/api", pdfRoutes);


export default app;
