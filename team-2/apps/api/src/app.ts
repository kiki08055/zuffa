import express from "express";
import admin from './routers/admin'
import user from './routers/user'
import auth from './routers/auth'
import cors from 'cors'
import environment from "dotenv";
import { ErrorHandlerMiddleware } from "./middlewares/boneka";

environment.config();

const app = express();
const PORT = process.env.PORT || 8000
const errorHandler = new ErrorHandlerMiddleware();

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // sesuaikan dengan frontend-mu
  credentials: true
}))

// jalur utama dari api
app.use("/api/admin", admin);
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errorHandler.errorHandler())

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
