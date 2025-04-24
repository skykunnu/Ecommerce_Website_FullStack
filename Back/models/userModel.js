import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  wishlist: [
    {
      type: String,
      unique: true,
    },
  ],
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
