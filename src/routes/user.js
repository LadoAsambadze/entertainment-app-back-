import express from "express";
import { login, singup } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/singup", singup);

export default router;
