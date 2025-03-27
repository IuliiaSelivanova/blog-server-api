import express from "express";
import registerUser from "../controllers/users/registerUser.js";
import loginUser from "../controllers/users/loginUser.js";
const router = express.Router();

// регистрация пользователя
router.post("/register", registerUser);

// аутентификация пользователя
router.post("/login", loginUser);

export default router;
