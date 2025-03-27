import express from "express";
import updateUser from "../controllers/users/updateUser.js";
import deleteUser from "../controllers/users/deleteUser.js";
import getUserById from "../controllers/users/getUserById.js";
const router = express.Router();

// изменение данных пользователя
router.put("/:id", updateUser);

// удаление пользователя
router.delete("/:id", deleteUser);

// получение данных пользователя по id
router.get("/:id", getUserById);

export default router;
