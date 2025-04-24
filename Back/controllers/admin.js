import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config.js"
import Admin from "../models/adminModel.js";
import categoryModel from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/userModel.js";

export async function loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).send({ message: "Email not found" });
  
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches)
        return res.status(404).send({ message: "Invalid Crendentials" });
  
      const adminToken = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
  
      console.log("LoginToken", adminToken);
  
      res
        .cookie("adminToken", adminToken, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600000,
        })
        .send({ message: "Login Successfull", admin: admin });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "User not login", errorString: error.message });
    }
  }
  
  export async function count(req,res){
    const count={categories:0, orders:0, products:0, users:0}
    try{

      count.categories=await categoryModel.countDocuments();
      count.products=await Product.countDocuments();
      count.users=await User.countDocuments();

      return res.send({count});
    }catch(error){
      res.status(500).send({message:"Unable to count the numbers", errorString:error.message});
    }
  }