import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const postSignup = async (req, res) => {
  const { name, email, mobile, city, country, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Name, Email and Password are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    mobile,
    city,
    country,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    return res.json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.password = undefined; // hide password

    return res.json({
      success: true,
      message: "Login successful",
      jwtToken,
      data: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { postSignup, postLogin };