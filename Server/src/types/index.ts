import { Request } from "express";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  createdAt: Date;
  userId: string;
}

export interface LoginRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
  name: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  description?: string;
  publishedYear?: number;
}
