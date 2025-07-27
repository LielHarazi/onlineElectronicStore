import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload, AuthenticatedRequest } from "../types";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({
      message: "Access denied. No token provided.",
      note: "Make sure cookies are enabled and you are logged in",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    // Map AuthPayload to the user format expected by AuthenticatedRequest
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired. Please login again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid token." });
    } else {
      res.status(403).json({ message: "Token verification failed." });
    }
  }
};

export const generateAccessToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};
