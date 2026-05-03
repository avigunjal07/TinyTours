import express from "express";
import { postSignup, postLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);

export default router;