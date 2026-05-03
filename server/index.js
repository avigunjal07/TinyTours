import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); 
console.log("MONGO_URI:", process.env.MONGO_URI);         // 1. Load env first

connectDB();              // 2. Connect DB

const app = express();    // 3. Create app

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);  // 4. Routes

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));