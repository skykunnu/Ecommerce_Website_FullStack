/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react"; // create and use context are react hooks used to manage and consume context.
// It is an api fetching tool used to make http requests.
import instance from "../axiosConfig";
// import axios from "axios"

// Context in react is made to solve the problem of prop drilling and to provide shared state or functions to multiple components.
// Context creates a central state (like a global store) that any component can access.

const ecomContext = createContext(); // created a context called ecomContext which  will be used to share state and functions across the app without passing props manually.

function EcomProvider({ children }) {
  // when any setstate (ex setCart, setWishlist and so on) is called , React re-renders any components that consume the (cart, wishlist) state (via the useEcom hook. )

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dealProduct, setDealProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // fetching all Products with only 10 products visible.
  async function fetchProduct(page = null) {
    // console.log("current page", page);
    try {
      setLoading(true);
      const response = await instance.get(
        page ? `/product/get/?page=${page}` : `/product/get`,
        { withCredentials: true }
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSingleProduct(id) {
    try {
      const response = await instance.get(`/product/get/${id}`);
      // setSingleProduct(response.data.products[0]);
      return response.data.products[0];
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllProducts() {
    try {
      const response = await instance.get("/product/get?limit=-1", {
        withCredentials: true,
      });
      setProduct(response.data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProductOrCategory(idToDelete, whatToDelete) {
    try {
      const response = await instance.delete(`/product/${idToDelete}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href =
          whatToDelete === "product" ? "/admin/products" : "/admin/categories";
      }
    } catch (error) {
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
      const response = await instance.get("/product/category");
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // filtering Products on the basis of category
  async function filterByCategory(categoryName, isName) {
    try {
      setLoading(true);
      const url = isName
        ? "/product/get/?categoryName="
        : "/product/get/?category=";
      const response = await instance.get(url + categoryName);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWishlist() {
    try {
      const response = await instance.get("/user/getWishlist", {
        withCredentials: true,
      });
      const wishlistData = response.data.wishlist;

      const populatedWishlist = await Promise.all(
        wishlistData.map(async (productSlug) => {
          const productResponse = await instance.get(
            `/product/get/${productSlug}`,
            { withCredentials: true }
          );
          console.log(productResponse);
          return { product: productResponse.data.products};
        })
      );

      console.log(wishlistData);
      console.log(populatedWishlist);
      setWishlist(populatedWishlist);
    } catch (error) {
      console.log(error);
    }
  }

  async function existInWishlist(slug) {
    const response = await instance.get(`/user/checkInWishlist/${slug}`, {
      withCredentials: true,
    });
    return response.data.exists ? true : false;
  }

  // addtowishlist function
  async function addToWishlist(productSlug) {
    try {
      if (await existInWishlist(productSlug)) {
        alert("Already exist in wishlist");
      } else {
        const response = await instance.post(
          "/user/addToWishlist",
          { productSlug },
          { withCredentials: true }
        );
        console.log(response);
        if (response.status === 200) {
          setWishlist([...wishlist, response.data.wishlist]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productSlug) {
    try {
      const response = await instance.delete(
        `/user/deleteWishlist/${productSlug}`,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // async function addToCart(productSlug) {
  //   try {
  //     if (existInCart(productSlug)) {
  //       alert("Already exist in cart");
  //     } else {
  //       const response = await instance.post(
  //         "/cart/addToCart",
  //         { productSlug: productSlug, quantity: 1 },
  //         { withCredentials: true }
  //       );
  //       console.log("Cart updated", response.data);
  //       if (response.status === 200) {
  //         return response.data;
  //       }
  //     }
  //   } catch (error) {
  //     console.log("product not added to cart", error);
  //   }
  // }

  // async function existInCart(slug) {
  //   const response = await instance.get(`cart/checkInCart/${slug}`, {
  //     withCredentials: true,
  //   });
  //   return response.status === 400 ? true : false;
  // }

  // async function fetchCart() {
  //   try {
  //     const response = await instance.get("/cart/fetchCart", {
  //       withCredentials: true,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <ecomContext.Provider
      // below is the shared state and functions
      value={{
        product,
        loading,
        dealProduct,
        wishlist,
        removeFromWishlist,
        setWishlist,
        deleteProductOrCategory,
        fetchWishlist,
        fetchProduct,
        // addToCart,
        addToWishlist,
        existInWishlist,
        fetchCategories,
        filterByCategory,
        fetchHotDeals,
        fetchAllProducts,
        fetchSingleProduct,
        // fetchCart,
      }}
    >
      {/* Below children represents <RouterProvider router={router} />  means every component rendered by RouterProvider (eg: First, Home, wishlist and so on) 
  will have access to all the shared state and functions provided by EcomProvider. 

  children is a critical part of EcomProvider as it ensures all child components can access the global state and functions managed by EcomProvider. 
  
  If we remove {children} none of the components would be rendered and our app will be blank. 
  */}
      {children}
    </ecomContext.Provider>
  );
}

export function useEcom() {
  return useContext(ecomContext);
}

export default EcomProvider;
