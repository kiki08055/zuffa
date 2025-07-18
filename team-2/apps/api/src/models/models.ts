import { Category } from "@prisma/client";
import { number } from "zod";

export interface Product {
  productId: number;
  name: string;
  image?: string;
  price: number;
  category: Category;
  stock: number;
  reviews: Review[]; 
  
}

export interface Review {
  reviewId: number;
  name: string;
  rating: number;
  text: string;
  productId: number; 
}

export interface AuthUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface Auth {
  adminId: number;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
    user = "user",
    admin = "admin"
}

export interface Transactions {
  transactionId: number;
  transactionStatus : TransactionStatus;
  quantity : number;
  total_price : number;
  createdAt? : Date,
  productId: number
  userId: number
}

export enum TransactionStatus {
  paid = "paid",
  pending = "pending"
}


