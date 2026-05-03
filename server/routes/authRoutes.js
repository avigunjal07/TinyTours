import express from "express";
import { postSignup, postLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);

router.get("/", (req, res) => {
  res.send("Auth API working");
});

import { checkJWT } from "../middlewares/jwt.js";

router.get("/profile", checkJWT, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;