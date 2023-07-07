import express from "express";
import { login, singup } from "../controllers/user-controller.js";
import multer from "multer";
const router = express.Router();




const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/storage/regimage");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
router.post("/login", login);

router.post(
  "/singup",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  singup
);

export default router;
