import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // Include cookies for JWT
});

export interface LoginRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}

// Auth API functions
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getMe: async (): Promise<AuthResponse> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Post API interfaces
export interface CreatePostRequest {
  title: string;
  content: string;
  category: "announcement" | "product" | "sale" | "review" | "tips" | "deal";
}

export interface PostResponse {
  success: boolean;
  message: string;
  post?: {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
  };
}

// Post API functions
export const postAPI = {
  createPost: async (postData: CreatePostRequest): Promise<PostResponse> => {
    const response = await api.post("/posts", postData);
    return response.data;
  },

  getAllPosts: async () => {
    const response = await api.get("/posts");
    return response.data;
  },
};
