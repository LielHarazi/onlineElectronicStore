// Authentication Types
export interface LoginData {
  name: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// User Types
export interface User {
  id: UserId;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  message: string;
}

// Product Types
export interface Product {
  id: ProductId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface CheckoutFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Event Types
export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>
) => void;
export type InputChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;
export type TextAreaChangeHandler = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => void;

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: InputChangeHandler;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "name" | "price" | "rating";
  sortOrder?: "asc" | "desc";
}

// Review Types
export interface Review {
  id: ReviewId;
  productId: ProductId;
  userId: UserId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Order Types
export interface Order {
  id: OrderId;
  userId: UserId;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Environment Types
export interface AppConfig {
  apiUrl: string;
  environment: "development" | "production" | "testing";
  version: string;
}

// React Event Types (for better compatibility)
export type ReactFormEvent = React.FormEvent<HTMLFormElement>;
export type ReactInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactTextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type ReactButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

// Generic Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonNullable<T> = T extends null | undefined ? never : T;

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Form State Types
export type FormState = "idle" | "submitting" | "success" | "error";

export interface FormStatus {
  state: FormState;
  message?: string;
  errors?: ValidationErrors;
}

// Loading and Error States
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type AsyncResult<T> = Promise<{
  success: boolean;
  data?: T;
  error?: string;
}>;

// Theme and UI Types
export type ThemeMode = "light" | "dark" | "system";
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// Date and Time Types
export type DateString = string; // ISO 8601 date string
export type TimeStamp = number; // Unix timestamp

// ID Types for better type safety
export type UserId = string;
export type ProductId = number;
export type OrderId = string;
export type ReviewId = string;
export type isLoading = string;
