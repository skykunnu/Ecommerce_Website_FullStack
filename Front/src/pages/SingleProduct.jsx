/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/EcomProvider";
import Loader from "../Components/Loader";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  const { fetchSingleProduct, fetchCategories, addToWishlist, addToCart } = useEcom();

  const { isUserLoggedIn } = useAuth();

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  // const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    const product = await fetchSingleProduct(id);
    setSingleProduct(product);
    const categories = await fetchCategories();
    setCategories(categories);
    setLoading(false);
  }

  useEffect(() => {
    if(categories?.category && singleProduct?.category){
      const category =categories.category.find(
        (obj)=>obj._id === singleProduct.category
      )
      setCategoryName(category?category.name:'Unknown');
    }
    // setCategoryName(
    //   categories?.category?.find((obj) => obj._id === singleProduct.category)
    //     .name
    // );
  }, [singleProduct, categories]);

  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(singleProduct.slug)
      : (window.location.href =
          "/user/login?referer=/product/" + singleProduct.slug);
  }

  function handleAddToCart() {
    isUserLoggedIn?addToCart(singleProduct.slug):(window.location.href="/user/login?referer=/product/" + singleProduct.slug);
  }

  if (loading) return <Loader />;

  return (
    <>
      {singleProduct && (
        <>
          <div className="flex items-center gap-10">
            <div className="left">
              <img src={singleProduct.image} />
            </div>
            <div className="right">
              <span className="flex py-2">
                <span className="text-4xl">{singleProduct.brand}</span>
                <h1 className="text-4xl px-2">{singleProduct.title}</h1>
              </span>
              <div>
                <strong>Brand:-</strong>
                {singleProduct.brand}
              </div>
              <div>
                <strong>Category:-</strong>
                {categoryName}
              </div>
              <div>
                <strong>Description:-</strong>
                {singleProduct.description}
              </div>
              <div className="flex gap-3 py-2">
                <Link
                  className="rounded px-2 py-1 bg-blue-400 text-white"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Link>
                <Link
                  className="rounded px-2 py-1 bg-blue-400 text-white"
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h1>SIMILAR PRODUCTS HERE</h1>
            {/* {similarProduct.map((item) => {
            return (
              <div key={item._id}>
                <img src={item.image} />
              </div>
            );
          })} */}
          </div>
        </>
      )}
    </>
  );
}

export default SingleProduct;
