import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import getImage from "./controllers/image-controller.js";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerMiddleware from "./middlewares/middlewares.js";
import tooggleBooked from "./controllers/bookmark-controller.js";

import userRoutes from "./routes/user.js";
import { profile } from "./controllers/user-controller.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
connect();

app.use("/home", getImage);
app.use("/profile", profile);

app.use("/bookmark/:title", tooggleBooked);
app.use("/images", express.static("public/storage/thumbnails"));
app.use("/avatar", express.static("public/storage/regimage"));

app.use("/", userRoutes);

app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
