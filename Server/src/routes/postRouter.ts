import express from "express";
import { createPost, getAllPosts } from "../controllers/PostCntroller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// GET /api/posts - Get all posts
router.get("/", getAllPosts);

// POST /api/posts - Create a new post (requires authentication)
router.post("/", authenticateToken, createPost);

export default router;
