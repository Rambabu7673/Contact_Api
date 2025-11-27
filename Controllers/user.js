import mongoose from "mongoose";
import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, age, password } = req.body;
  if (name == "" || email == "" || password == "" || age == "")
    return res.json({ message: "All fields are required" });
  let user = await User.findOne({ email });
  if (user)
    return res.json({
      message: "User created allready  can you login new email ",
      success: false,
    });
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, age, password: hashPassword });
  res.json({
    message: "User created successfully ",
    success: true,
    user: user,
  });
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ message: "User does not exist", success: false });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ message: "Invalid password", success: false });

    // Generate Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    return res.json({
      message: `Welcome ${user.name}`,
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.json({ message: "Server error", error });
  }
};

