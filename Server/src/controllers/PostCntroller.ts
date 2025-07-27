import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types";

// Mock data store (in a real app, you'd use a database)
interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  authorId: string;
  createdAt: string;
  featured: boolean;
}

let posts: Post[] = [];
let nextId = 1;

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // Validate category
    const validCategories = [
      "announcement",
      "product",
      "sale",
      "review",
      "tips",
      "deal",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // Create new post
    const newPost: Post = {
      id: nextId++,
      title: title.trim(),
      content: content.trim(),
      category,
      author: user.name,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      featured: false,
    };

    posts.push(newPost);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      posts: posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
