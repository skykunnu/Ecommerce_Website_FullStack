import cartModel from "../models/cartModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/userModel.js";

export async function fetchCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error fetching cart:", error);
    res.status(500).send({ message: "Error fetching cart" });
  }
}

// Add product to cart
export async function addToCart(req, res) {
  try {
    const userId = req.user._id;
    const { productSlug, quantity = 1 } = req.body;

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product === productSlug
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const productToAdd = await Product.findOne({ slug: productSlug });

      cart.items.push({ product: productToAdd._id, quantity: quantity });
    }

    await cart.save();
    const updatedCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).send({
      message: "Problem adding product to cart",
      errorString: error.message,
    });
  }
}

export async function checkExisting(req, res) {
  const { slug } = req.params;
  const { id } = req.user;
  try {
    //GETING PRODUCT ID FROM SLUG
    let productToFindInCart = await Product.findOne({ slug: slug });
    productToFindInCart = productToFindInCart.id;

    //GETTING USER'S CART
    let userCart = await cartModel.findOne({ user: id });
    userCart = userCart.items;

    const productExists = userCart.find((cartItem) => {
      return cartItem.product.toString() === productToFindInCart;
    });

    if (productExists)
      return res.status(400).send({ message: "Product Exists" });
    else return res.status(200).send({ message: "Product Doesn't Exists" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server side error", errorString: error.message });
  }
}
