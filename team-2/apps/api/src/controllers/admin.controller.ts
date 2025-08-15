import { Response, Request, NextFunction } from "express";
import { AdminService } from "../services/admin";
import cloudinary from "../config/cloudinary";
import { Category } from "@prisma/client";

export class adminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async getAllProduct(req: Request, res: Response) {
    const products = await this.adminService.getAllProduct();
    if (products) {
      res.status(200).send({
        data: products,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Data tidak ditemukan",
        status: res.statusCode,
      });
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, price, image, category, stock } = req.body;

      if (!name || !price || !image || !category || !stock) {
        res.status(400).send({
          message: "Semua field (name, price, image, category) wajib diisi",
        });
        return;
      }

      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "api",
      });

      const newProduct = await this.adminService.createProduct({
        name,
        price: parseFloat(price),
        image: uploadResult.secure_url,
        category: category.toUpperCase() as Category,
        stock,
      });

      res.status(201).send({
        message: "Sukses membuat produk",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error saat membuat produk:", error);
      next(error);
    }
  }

  async getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await this.adminService.getProductById(id);
    if (product) {
      res.status(200).send({
        message: `Produk ${id} ditemukan`,
        data: product,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: `Produk ${id} tidak ditemukan`,
      });
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { name, price, category } = req.body;
      const image = req.file?.path;

      const updated = await this.adminService.updateProduct(id, {
        name,
        price: price ? parseFloat(price) : undefined,
        image,
        category: category?.toUpperCase() as Category,
      });

      if (!updated) {
        res.status(404).send({ message: "Produk tidak ditemukan" });
        return;
      }

      res.status(200).send({
        message: "Produk berhasil diupdate",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await this.adminService.deleteProduct(id);
    if (deleted) {
      res.status(200).send({
        message: "Produk berhasil dihapus",
        data: deleted,
      });
    } else {
      res.status(400).send({
        message: "Gagal menghapus produk",
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.adminService.getAllUsers();
    if (users) {
      res.status(200).send({
        data: users,
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: "Data tidak ditemukan",
        status: res.statusCode
      });
    }
  };

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const users = await this.adminService.getUserById(id);
    if (users) {
      res.status(200).send({
        message: `User ${id} ditemukan`,
        data: users,
        status: res.statusCode
      });
    } else {
      res.status(400).send({
        message: `User ${id} tidak ditemukan`
      }
      )
    };
  }
  async deleteUsers(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await this.adminService.deleteUsers(id);
    if (deleted) {
      res.status(200).send({
        message: "User berhasil dihapus",
        data: deleted
      });
    } else {
      res.status(400).send({
        message: "Gagal menghapus user"
      })
    }
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.adminService.getAllTransactions();

      res.status(200).send({
        data: transactions,
        status: 200,
      });
    } catch (error) {
      res.status(500).send({
        message: "Gagal mengambil data transaksi",
        error: (error as Error).message,
        status: 500,
      });
    }
  }

}

