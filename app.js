import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
// import multer from "multer";
// import path from "path";

const PORT = 3000;

const app = express();

// ????
// dotenv.config();
app.use(express.json());
// app.use(
//   "/images",
//   express.static(path.join(__dirname, "/images")),
// );

// подключение к БД
mongoose
  .connect("mongodb://localhost:27017/blog-app")
  .then(console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("MongoDB connection error:", error),
  );

// ????
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post(
//   "api/upload",
//   upload.single("file"),
//   (req, res) => {
//     res.status(200).json("File has been uploaded");
//   },
// );

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
