import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

async function uploadToCloudinary(req) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      folder: "ecommerce",
    })
    .catch((error) => {
      console.log(error);
     });

  console.log(uploadResult);
  return uploadResult.secure_url;
}

export default uploadToCloudinary;
