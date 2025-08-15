import { Prisma, PrismaClient, Category } from "@prisma/client";
import { Product, AuthUser } from "../models/models";

export class AdminService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllProduct() {
    return this.prisma.product.findMany();
  }

  async createProduct(data: {
    name: string;
    image: string;
    price: number;
    category: Category;
    stock: number;
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        image: data.image,
        price: data.price,
        category: data.category,
        stock: data.stock
      },
    });
  }

  async getProductById(productId: number) {
    return this.prisma.product.findUnique({
      where: { productId },
      include: {
        reviews: true,
      },
    });
  }

  async updateProduct(productId: number, data: Partial<Product>) {
    return this.prisma.product.update({
      where: { productId },
      data: {
        name: data.name,
        image: data.image,
        price: data.price ? Number(data.price) : undefined,
        category: data.category as Category, // pastikan dikonversi jika nullable
      },
    });
  }

  async deleteProduct(productId: number) {
    return this.prisma.product.delete({
      where: { productId },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  };
  getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    });
  }
  deleteUsers(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId }
    })
  }

  async getAllTransactions() {
    return await this.prisma.transaction.findMany({
      include: {
        user: true,
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

}
