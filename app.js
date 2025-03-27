import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import multer from "multer";
import cors from "cors";
import path from "path";

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join("./images")));

// подключение к БД
mongoose
  .connect(process.env.MONGO_URL_ATLAS)
  .then(console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("MongoDB connection error:", error),
  );

// загрузка файлов
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post(
  "/api/upload",
  upload.single("file"),
  (req, res) => {
    res.status(200).json("File has been uploaded");
  },
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
