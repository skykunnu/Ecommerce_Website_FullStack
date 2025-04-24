import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    
  },
  role:{
    type:String,
    default:"admin"

  }
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;