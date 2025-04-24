import express from "express";
import cors from "cors";
import { connectDB } from "./connection/Db.js";
import productRouter from "./routes/productRoutes.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import dealRouter from "./routes/dealRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

// CORS is a browser feature that does not allow  different origins to share data among each other.

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/deals", dealRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);

connectDB();

app.listen(port, () => {
  console.log("Server started at " + port);
});
