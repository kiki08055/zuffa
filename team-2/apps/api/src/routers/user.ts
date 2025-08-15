import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { AuthJwtMiddleware } from "../middlewares/auth";

const router = Router();
const UserController = new userController()
const authMiddleware = new AuthJwtMiddleware();

router.get("/product/search", UserController.searchProduct.bind(UserController));
router.get("/product/:id", UserController.getProductById.bind(UserController));
router.get("/product", UserController.getProduct.bind(UserController));
router.get("/profile", authMiddleware.authenticateJwt, UserController.getProfile.bind(UserController));
router.post("/reviews",UserController.createReview.bind(UserController));

router.post("/transactions", authMiddleware.authenticateJwt,UserController.createTransactions.bind(UserController));
router.get("/transactions/user/:userId", UserController.getTransactionsByUserId.bind(UserController));

export default router;