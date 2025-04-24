import mongoose from "mongoose";


const cartItemSchema=new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
    },
    attributes:{
        type:Map,
        of:String,
    },
});

const cartSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqiured:true,
    },
    items:[cartItemSchema],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
});

const cartModel= mongoose.model("Cart", cartSchema);

export default cartModel;