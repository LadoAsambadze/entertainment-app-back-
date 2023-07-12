import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please enter email and password" });
    } else {
      const user = await userModel.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            {
              user: user.email,
              avatar: user.avatar,
            },
            process.env.SECRET
          );

          res.status(200).json({ message: "Successful Loged", user, token });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      } else {
        res.status(400).json({ message: "Incorrect email" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

export const singup = async (req, res) => {
  const { email, password } = req.body;
  const { file } = req;

  try {
    if (email === "" || password === "") {
      res.status(400).json({ message: "Please enter email and password" });
    } else {
      const exist = await userModel.findOne({ email });

      if (!exist) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = new userModel({
          email,
          password: hash,
          avatar: "/avatar/"+file.originalname,
        });
        const newUser = await user.save();

        res.status(200).json({ message: "Successful Sing up", newUser });
      } else {
        res.status(400).json({ message: "Email already exists" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

export const profile = async (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.trim().split(" ")[1];

    jwt.verify(token, process.env.SECRET, {}, (error, useData) => {
      if (error) throw error;
      res.status(200).json(useData);
    });
  } else {
    res.status(403).json("No token!");
  }
};
