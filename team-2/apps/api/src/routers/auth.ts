import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post('/login', AuthController.login.bind(AuthController)),
router.post('/register/admin', AuthController.registerAdmin.bind(AuthController)),
router.post("/register/user", AuthController.registerUser.bind(AuthController))
router.post('/refresh', AuthController.refresh.bind(AuthController));
export default router;