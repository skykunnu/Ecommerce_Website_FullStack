import { useEcom } from "../Context/EcomProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import Loader from "../Components/Loader";


function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist } = useEcom(); // this useEcom is nothing but say useContext(ecomContext).
  const [loading, setLoading]=useState(false);
  useEffect(() => {
  
    async function loadWishlist(){
      setLoading(true);
      await fetchWishlist();
      setLoading(false);
    }
  loadWishlist();
  },[]);
  
  async function handleWishlist(productSlug){
      setLoading(true);
      await removeFromWishlist(productSlug);
      await fetchWishlist();
      setLoading(false);
    }

  if (loading) return <Loader />;
  return (
    <div>
      {wishlist &&
        wishlist.map((item) => {
          return (
            <div
              key={item?.product?._id}
              className="flex items-center justify-between  border m-3 rounded-2xl py-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item?.product?.image}
                  alt=""
                  className="w-[130px] h-[140px] mx-5"
                />
                <div className=" flex flex-col gap-3 w-3xl">

                  <div className="flex gap-2">
                    <h1 className="font-bold text-2xl/4">{item?.product?.brand}</h1>
                    <h2 className='text-xl/5'>{item?.product?.title}....</h2>
                  </div>
                  <p className='text-[#0964af] text-lg'>
                    {item?.product?.description
                      .split(" ")
                      .slice(0, 11)
                      .join(" ") + "..."}
                  </p>
                  <div className="flex text-2xl/5 font-semibold text-violet-950">
                   <span><MdCurrencyRupee /></span> 
                    <span>{item?.product?.OriginalPrice}</span>
                  </div>
                </div>


              </div>
              <div className="buttons flex  gap-3 py-2 px-4">
                <Link className="rounded px-2 py-1 bg-green-600 text-white">
                  Add To Cart
                </Link>
                <Link className="rounded px-2 py-1 bg-red-600 text-white" onClick={()=>handleWishlist(item?.product?.slug)}>
                  Remove From Wishlist
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Wishlist;
