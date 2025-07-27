import { Request, Response } from "express";
import { LoginRequest, RegisterRequest, AuthenticatedRequest } from "../types";
import UserModel from "../models/User";
import { generateAccessToken } from "../middleware/auth";

const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name }: RegisterRequest = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Create new user
      const user = await UserModel.create({ email, password, name });

      // Generate token
      const token = generateAccessToken({
        userId: user.id,
        email: user.email,
        name: user.name,
      });

      // Set HTTP-only cookie (local dev: secure: false, sameSite: 'lax')
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // false for local dev
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: LoginRequest = req.body;

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      // Optional: Also validate that the name matches if provided
      if (name && user.name !== name) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      // Validate password
      const isValid = await UserModel.validatePassword(password, user.password);
      if (!isValid) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      // Generate token
      const token = generateAccessToken({
        userId: user.id,
        email: user.email,
        name: user.name,
      });

      // Set HTTP-only cookie (local dev: secure: false, sameSite: 'lax')
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // false for local dev
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ success: false, message: "Server error during login" });
    }
  },

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.user!.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error("GetMe error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false, // false for local dev
        sameSite: "lax",
      });
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Server error during logout" });
    }
  },

  async getAllUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const users = UserModel.getAllUsers();

      // Remove password field from response
      const safeUsers = users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }));

      res.json({
        message: `Found ${safeUsers.length} users`,
        users: safeUsers,
        total: safeUsers.length,
      });
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({ message: "Server error while fetching users" });
    }
  },

  async deleteUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      console.log(
        `🗑️ Delete request: User ${req.user!.id} trying to delete user ${id}`
      );

      // Prevent users from deleting themselves (optional safety check)
      if (id === req.user!.id) {
        console.log(`❌ Self-deletion attempt blocked`);
        res.status(400).json({
          message: "Cannot delete your own account using this endpoint",
        });
        return;
      }

      const user = await UserModel.findById(id);
      if (!user) {
        console.log(`❌ User ${id} not found`);
        res.status(404).json({ message: "User not found" });
        return;
      }

      const deleted = UserModel.deleteUser(id);

      if (deleted) {
        console.log(`✅ User ${id} deleted successfully`);
        res.json({
          message: "User deleted successfully",
          deletedUser: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });
      } else {
        console.log(`❌ Failed to delete user ${id}`);
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Server error while deleting user" });
    }
  },
};

export default AuthController;
