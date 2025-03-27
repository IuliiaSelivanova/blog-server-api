import express from "express";
import getCategories from "../controllers/categories/getCategories.js";
import createCategories from "../controllers/categories/createCategory.js";
const router = express.Router();

// получение категорий
router.get("/", getCategories);

// создание новой категории
router.post("/", createCategories);

export default router;
