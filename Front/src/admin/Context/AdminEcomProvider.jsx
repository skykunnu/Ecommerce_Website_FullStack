/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

import instance from "../../axiosConfig";

const AdminEcom = createContext();


function AdminEcomProvider({children}) {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productsByCat, setProductsByCat] = useState([]);
    const [dealProduct, setDealProduct] = useState([]);
    const [count, setCount]= useState({
        categories:0,
        orders:0,
        products: 0,
        users: 0,
    })
    // fetching all Products
    async function fetchProduct(page=null) {
      try {
        setLoading(true);
        // const response = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product`);
        const response = await instance.get(`/product/get?page=${page}`, {
          withCredentials: true,
        });
        console.log("Fetch Product",response.data);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  
    async function fetchAllProducts(){
      try{
        const response=await instance.get("/product/get?limit=-1",{withCredentials:true})
        setProduct(response.data)
      }catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  
  
  
    async function deleteProductOrCategory(idToDelete,whatToDelete){
      try{
      const response=await instance.delete(`/product/${idToDelete}`,{withCredentials:true})
      if(response.status===200){
        window.location.href=whatToDelete==='product'?"/admin/products":"/admin/categories"
      }
      }catch(error){
        console.log(error)
      }
    }

    async function getCount(){
        try{
            const response= await instance.get("/admin/count",{
                withCredentials:true,
            })
            
            setCount(response.data.count);
        }catch(error){
            console.log(error);
        }
    }
 
    async function fetchHotDeals() {
      try {
        const response = await instance.get("/deals", { withCredentials: true });
        setDealProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    // fetching all categories
    async function fetchCategories() {
      try {
        setLoading(true);
        // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/categories/all");
        const response = await instance.get("/product/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  
    // filtering Products on the basis of category
    async function filterByCategory(category) {
      try {
        setLoading(true);
        // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/?category=" + category);
        const response = await instance.get("/product/get/?category=" + category);
        console.log(response.data);
        setProductsByCat(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  
    // addtowishlist function
    function addToWishlist(product) {
      if (existInWishlist(product._id)) {
        alert("Already exist in wishlist");
      } else {
        const obj = { product };
        setWishlist([...wishlist, obj]);
      }
    }
  
    // function to check whether product is there in the wishlist or not.
    function existInWishlist(id) {
      const productAlreadyExists = wishlist.find(
        (wishlistItem) => wishlistItem.product._id === id
      );
      return productAlreadyExists ? true : false;
    }
  
    // function to remove item from wishlist.
    function removeFromWishlist(id) {
      setWishlist(wishlist.filter((item) => item.product._id !== id));
    }
  
    // addToCart function
    async function addToCart(product) {
  
  
      try {
        const response = await instance.post(
          "/cart/add",
          { product: product._id, quantity: 1 },
          { withCredentials: true }
        );
        console.log("Cart updated", response.data);
        addToCart(response.data);
      } catch (error) {
        console.log("product not added to cart", error);
      }
  
  
      if (existInCart(product._id)) {
        // If the product is already in the cart, updates it quantity.
        setCart(
          cart.map((cartItem) =>
            cartItem.product._id === product._id
              ? { ...cartItem, quantity: Number(cartItem.quantity) }
              : cartItem
          )
        );
        // If the product is not in the cart, add it with the quantity 1.
      } else {
        const obj = { product, quantity: 1 };
        setCart([...cart, obj]);
      }
    }
  
  
  
  
  
  
    // function to check whether product is there in the cart or not.
    function existInCart(id) {
      // find () searches the array to find the first product that matches with the given id.
      const productAlreadyExists = cart.find(
        (cartItem) => cartItem.product._id === id
      );
      return productAlreadyExists ? true : false;
    }
  
    // function to remove item from cart.
    function removeFromCart(id) {
      // filter function returns all those product whose id is not equal to given id in form of an array.
      setCart(cart.filter((item) => item.product._id !== id));
    }
  
    // function to update the quantity of the product.
    function updateQuantity(productId, sign) {
      if (!existInCart(productId)) {
        alert("Incorrect Id");
      }
      setCart(
        cart.map((cartItem) =>
          cartItem.product._id === productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + (sign === "+" ? 1 : -1),
              }
            : cartItem
        )
      );
    }
  
    return (
      <AdminEcom.Provider
        // below is the shared state and functions
        value={{
          product,
          cart,
          loading,
          wishlist,
          categories,
          productsByCat,
          dealProduct,
          deleteProductOrCategory,
          fetchProduct,
          addToCart,
          removeFromCart,
          existInCart,
          updateQuantity,
          addToWishlist,
          existInWishlist,
          removeFromWishlist,
          fetchCategories,
          filterByCategory,
          fetchHotDeals,
          fetchAllProducts,
          count,
          getCount,
        }}
      >
        {/* Below children represents <RouterProvider router={router} />  means every component rendered by RouterProvider (eg: First, Home, wishlist and so on) 
    will have access to all the shared state and functions provided by EcomProvider. 
  
    children is a critical part of EcomProvider as it ensures all child components can access the global state and functions managed by EcomProvider. 
    
    If we remove {children} none of the components would be rendered and our app will be blank. 
    */}
        {children}
      </AdminEcom.Provider>
    );

  
}

export function useAdminEcom(){
    return useContext(AdminEcom);
}

export default AdminEcomProvider



