// file ini untuk membuat middleware dalam rangka validasi data, authentication, dan authorization
import { Request, Response, NextFunction } from "express";

export class ErrorHandlerMiddleware {
  errorHandler() {
    return(err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(`[Error] ${err.message}`);
        res.status (500).send ({
            message: " Internal Server Error",
        });
        next();
    };
  }
}