// server/index.js
import "dotenv/config";
import dns from "node:dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import enquiryRoutes from "./routes/enquiry.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// --- middleware ---
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    // e.g. CLIENT_ORIGIN=https://mvmdigitals.com,http://localhost:5173
  }),
);

// --- routes ---
app.use("/api/enquiry", enquiryRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// --- connect to MongoDB, then start server ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
