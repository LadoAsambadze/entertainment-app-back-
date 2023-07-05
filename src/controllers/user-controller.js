import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newData = new userModel({ email, password });
    const final = await newData.save();
    res.status(200).json({ message: "Successful login", final });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

export const singup = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if ((!email, !password)) {
      res.status(400).json({ message: "Please enter email and password" });
    }
    const exist = await userModel.findOne({ email });

    if (!exist) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const user = new userModel({ email, password: hash });
      const newUser = await user.save();
      res.status(200).json({ message: "Successful Sing up", newUser });
    } else {
      res.status(400).json({ message: "Email already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};
