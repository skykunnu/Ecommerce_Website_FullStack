import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";



// User login check
export async function check(req, res, next) {
  const token = req.cookies.LoginToken;
  if (!token) return res.status(401).send({ message: "No Token Found" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(401).json({ message: "USER NOT FOUND" });
  }

  req.user = user;
  next();
}



// Admin login check
export async function checkAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).send({ message: "No Token Found" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    return res.status(401).json({ message: "Admin NOT FOUND" });
  }

  req.admin = admin;
  next();
}


