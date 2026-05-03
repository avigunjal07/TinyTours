import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { postSignup, postLogin } from "./controllers/auth.js";
import { getHome, getHealth } from "./controllers/health.js";
import { getTours, postTours, putTours } from "./controllers/tours.js";
import { postContact, getContact } from "./controllers/Contact.js";
import { checkJWT } from "./middlewares/jwt.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


app.get("/auth", (req, res) => {
  const { token, expire, signature } =
    imagekit.helper.getAuthenticationParameters();

  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});


app.post("/signup", postSignup);
app.post("/login", postLogin);
app.use("/api/auth", authRoutes);

app.post("/tours", checkJWT, postTours);
app.get("/tours", checkJWT, getTours);
app.put("/tours/:id", checkJWT, putTours);

app.post("/api/contact", checkJWT, postContact);
app.get("/api/contact", checkJWT, getContact);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});