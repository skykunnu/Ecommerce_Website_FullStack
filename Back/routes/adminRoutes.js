import express from "express";
import { loginAdmin, count } from "../controllers/admin.js";
import { checkAdmin } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).send({ message: "Logged Out" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
adminRouter.get("/check", checkAdmin, (req, res) => {
  res.send({ message: "admin authenticated" , admin: req.admin });
});


adminRouter.get("/count",count);


export default adminRouter;
