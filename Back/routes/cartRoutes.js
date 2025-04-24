import express from "express";
import { fetchCart, addToCart, checkExisting } from "../controllers/cart.js";
import { check } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/fetchCart", check, fetchCart);
cartRouter.post("/addToCart", check, addToCart);
cartRouter.get("/checkInCart/:slug", check, checkExisting);

export default cartRouter;
