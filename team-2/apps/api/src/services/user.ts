import { PrismaClient, Category, TransactionStatus } from "@prisma/client";
import { reviewSchema } from "../validators/review.schema";
import { error } from "console";


const isValidCategory = (value: string): value is Category => {
  return Object.values(Category).includes(value as Category);
};

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProduct() {
    return this.prisma.product.findMany();
  }

  async getProductById(productId: number) {
    return this.prisma.product.findUnique({
      where: {
        productId: productId,
      },
      include: {
        reviews: true,
      },
    });
  }

  async createReviews(data: unknown) {
    const validateData = reviewSchema.parse(data);

    const forbiddenWords = ["bodoh", "goblok", "anjing", "bangsat", "tolol", "tai", "memek", "pepek", "kontol", "jancok"];
    const containsToxicWords = (text: string) => {
      const lowerText = text.toLowerCase();
      return forbiddenWords.some((word) => lowerText.includes(word));
    };

    if (containsToxicWords(validateData.text)) {
      throw new Error("Review mengandung kata tidak pantas.");
    }

    return this.prisma.review.create({
      data: {
        name: validateData.name,
        rating: validateData.rating,
        text: validateData.text,
        product: {
          connect: { productId: validateData.productId },
        },
      },
    });
  }

  async searchProduct(query: string, category?: string) {
    let categoryFilter: Category | undefined = undefined;

    if (category) {
      const upperCategory = category.toUpperCase() as keyof typeof Category;
      if (Object.keys(Category).includes(upperCategory)) {
        categoryFilter = Category[upperCategory];
      } else {
        throw new Error("Kategori tidak valid");
      }
    }

    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        ...(categoryFilter && { category: categoryFilter }),
      },
    });
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return user;
  }

  async getProductByCategory(category: string) {
    const upperCategory = category.toUpperCase() as keyof typeof Category;

    if (!Object.keys(Category).includes(upperCategory)) {
      throw new Error("Kategori tidak valid");
    }

    return this.prisma.product.findMany({
      where: {
        category: Category[upperCategory],
      },
    });
  }

  async createTransactions(userId: number, productId: number, quantity: number) {
    // Cek user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    // Cek produk
    const product = await this.prisma.product.findUnique({
      where: { productId },
    });
    if (!product) throw new Error("Product not found");
    if (product.price === null) throw new Error("Product price is missing");
    if (product.stock < quantity) throw new Error("Stock is not sufficient");

    const totalPrice = product.price * quantity;

    // Buat transaksi
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        productId,
        quantity,
        total_price: totalPrice,
        traansactionStatus: "PENDING", // enum Status
      },
    });

    return transaction;
  }

async getTransactionsByUserId(userId: number) {
  if (!userId || isNaN(userId)) {
    throw new Error("userId tidak valid atau kosong");
  }

  console.log("📌 getTransactionsByUserId menerima userId:", userId);

  return this.prisma.transaction.findMany({
    where: { userId: userId },
    include: { product: true },
  });
}


}
