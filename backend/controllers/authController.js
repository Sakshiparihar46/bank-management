import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // 3. Generate token ONLY if valid
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
    res.json({ token });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};