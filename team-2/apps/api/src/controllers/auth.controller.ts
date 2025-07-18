import { Request, Response } from 'express';
import { AuthService } from '../services/auth';

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      res.status(200).send({
        message: "Login successfully",
        result,
      });
    } catch (error: any) {
      res.status(401).send({ message: error.message });
    }
  }

  static async registerAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.registerAdmin(email, password);
      res.status(201).send({
        message: "Register admin successfully",
        result,
      });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  static async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.registerUser(email, password);
      res.status(201).send({
        message: "Register user successfully",
        result,
      });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
         res.status(400).send({ error: 'Refresh token is missing' });
      }

      const result = await authService.refreshToken(refreshToken);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(401).send({ message: error.message });
    }
  }
}
