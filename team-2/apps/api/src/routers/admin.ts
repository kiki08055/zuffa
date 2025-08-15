// file ini untuk meletakkan route/jalur endpoint tiap feature

import { Router } from "express";
import upload from "../middlewares/upload";
import { adminController } from "../controllers/admin.controller";


const router = Router();
const AdminController = new adminController();

router.get("/product", AdminController.getAllProduct.bind(AdminController))
router.post("/product",upload.single("image"),AdminController.createProduct.bind(AdminController))
router.get("/product/:id", AdminController.getProductById.bind(AdminController))
router.put("/product/:id", upload.single("image"),AdminController.updateProduct.bind(AdminController))
router.delete("/product/:id",AdminController.deleteProduct.bind(AdminController))

router.get("/users", AdminController.getAllUsers.bind(AdminController));
router.get("/users/:id", AdminController.getUserById.bind(AdminController));
router.delete("/user/:id", AdminController.deleteUsers.bind(AdminController));

router.get("/transactions", AdminController.getAllTransactions.bind(AdminController));

export default router;
