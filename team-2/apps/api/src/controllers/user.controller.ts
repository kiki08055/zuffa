import { Response, Request, NextFunction } from "express";
import { UserService } from "../services/user";
import { reviewSchema } from "../validators/review.schema";
import { Result } from "@prisma/client/runtime/library";

export class userController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProduct(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;

      let products;

      if (category) {
        products = await this.userService.getProductByCategory(category);
      } else {
        products = await this.userService.getProduct();
      }

      res.status(200).send({
        message: "Produk berhasil diambil",
        data: products,
      });
    } catch (error: any) {
      res.status(400).send({
        message: error.message || "Gagal mengambil produk",
      });
    }
  }


  async getProductById(req: Request, res: Response) {
    console.log("ID dari req params:", req.params.id);

    const id = Number(req.params.id);
    const product = await this.userService.getProductById(id);

    if (product) {
      res.status(200).send({
        message: `Product ${id} ditemukan`,
        data: product,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: `Product ${id} tidak ditemukan`,
        status: res.statusCode,
      });
    }
  }

  async createReview(req: Request, res: Response): Promise<void> {
    const parsed = reviewSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).send({
        message: "Validasi gagal",
        errors: parsed.error.errors,
      });
      return;
    }

    try {
      const review = await this.userService.createReviews(parsed.data);
      res.status(201).send({
        message: "Review berhasil dibuat",
        data: review,
      });
    } catch (error: any) {
      res.status(400).send({
        message: error.message || "Gagal membuat review",
      });
    }
  }

  async searchProduct(req: Request, res: Response, next: NextFunction) {
    const { query, category } = req.query;

    if (!query) {
      res.status(400).send({
        message: "Query pencarian wajib diisi",
      });
    }

    try {
      const product = await this.userService.searchProduct(
        query as string,
        category as string | undefined
      );

      res.status(200).send({
        message: "Berhasil mencari produk",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }


  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      const profile = await this.userService.getProfile(userId);
      res.status(200).send({
        message: "Berhasil mengambil profil",
        data: profile,
      });
    } catch (error: any) {
      next(error);
    }
  }
  async createTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("=== [DEBUG] req.user ===", (req as any).user);

      const userId = Number((req as any).user?.id);
      const { productId, quantity } = req.body;

      console.log("=== [DEBUG] userId ===", userId);
      console.log("=== [DEBUG] productId ===", productId);
      console.log("=== [DEBUG] quantity ===", quantity);

      if (isNaN(userId) || productId == null || quantity == null) {
        res.status(400).json({
          message: "Data userId, productId, dan quantity harus diisi.",
          status: 400,
        });
        return;
      }

      const transaction = await this.userService.createTransactions(
        userId,
        productId,
        quantity
      );

      res.status(201).json({
        message: "Berhasil membuat transaksi",
        data: transaction,
        status: 201,
      });
    } catch (error) {
      console.error("Gagal membuat transaksi:", error);
      res.status(400).json({
        message: (error as Error).message || "Terjadi kesalahan saat membuat transaksi",
        status: 400,
      });
    }
  }

}
