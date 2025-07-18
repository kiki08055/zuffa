import { Request, Response, NextFunction } from "express";
import environment from "dotenv";
import jwt from "jsonwebtoken";

environment.config();

export class AuthJwtMiddleware {
  authenticateJwt(req: Request, res: Response, next: NextFunction): void {
    console.log("Incoming request:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) {
      res.status(401).send({
        message: "Access token is missing or invalid",
        status: 401,
      });
      return;
    }

    jwt.verify(token, JWT_SECRET as string, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid token",
          status: 401,
        });
      }
      
       console.log("Decoded token:", decoded);
      // Perhatikan ini: kita simpan userId & role ke req.user
      (req as any).user = {
        id: decoded.id,
        role: decoded.role,
      };

      console.log("Set req.user as:", (req as any).user);

      next();
    });
  }
}
