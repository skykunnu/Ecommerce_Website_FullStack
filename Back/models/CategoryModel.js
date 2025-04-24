import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  image:{
    type:String,
    required:true,
  }
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
