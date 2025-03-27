import express from "express";
import createPost from "../controllers/posts/createPost.js";
import updatePost from "../controllers/posts/updatePost.js";
import deletePost from "../controllers/posts/deletePost.js";
import getPost from "../controllers/posts/getPost.js";
import getPosts from "../controllers/posts/getPosts.js";
const router = express.Router();

// создание поста
router.post("/", createPost);

// изменение поста
router.post("/:id", updatePost);

// удаление поста
router.post("/:id", deletePost);

// получение поста по id
router.get("/:id", getPost);

// получение всех постов
router.get("/", getPosts);

export default router;
