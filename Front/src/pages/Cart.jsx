import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";

function Cart() {
  const { fetchCart } = useEcom();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setCart(await fetchCart());
    setLoading(false);
  }

  // console.log(cart);
  useEffect(() => {
    if (cart.items) {
      setTotalPrice(
        cart?.items.reduce((accumulator, current) => {
          return accumulator + current.product.OriginalPrice * current.quantity;
        }, 0)
      );
    }
  }, [totalPrice, cart]);

  if (loading) return <div id="loading">LOADING...</div>;

  return (
    <div className="cart flex gap-8">
      {cart?.items?.length === 0 ? (
        <div className="emptyCart">
          <h2>Nothing is added to the cart</h2>
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </div>
      ) : (
        <>
          <div className="cartContent w-2/3">
            {cart.items.map((item) => {
              return (
                <div
                  key={item.product._id}
                  className="cartItem flex gap-5 px-4 mb-8"
                >
                  <img src={item.product.image} className="w-[9rem] h-[9rem]" />
                  <div className="Item-info px-10 pt-4">
                    <h3 className="text-2xl mb-2">{item.product.title}</h3>
                    <p className="flex items-center py-1 font-bold">
                      <MdOutlineCurrencyRupee className="" />
                      <span>{item.product.OriginalPrice}</span>
                    </p>
                    <div className="flex flex-col">
                      <span>
                        <strong>Brand:- </strong>
                        {item.product.brand}
                      </span>
                      <span>
                        <strong>Description:- </strong>
                        {item.product.description}
                      </span>
                    </div>
                    <div className="quantityChanger flex mt-2">
                      {item.quantity === 1 ? (
                        <p
                          className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <MdOutlineDeleteForever />
                        </p>
                      ) : (
                        <p
                          className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                          onClick={() => updateQuantity(item.product._id, "-")}
                        >
                          -
                        </p>
                      )}

                      <p className="cursor-pointer w-10 border  border-gray-200 bg-gray-100 flex items-center justify-center">
                        {item.quantity}
                      </p>

                      <p
                        className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                        // onClick={() => updateQuantity(item.product._id, "+")}
                        onClick={() => addToCart(item.product)}
                      >
                        +
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="cartTotal w-1/3 max-h-64 bg-amber-100 rounded-lg p-4 mr-4">
            <h2 className="text-xl font-bold text-center">Order Summary</h2>

            <div className="itemTotalPrice flex justify-between items-center py-1">
              <p>Items:</p>
              <p className="inline-flex items-center">
                <MdOutlineCurrencyRupee /> <span>{totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <div className="deliveryCharges flex justify-between items-center py-1">
              <p>Delivery:</p>
              <p>--</p>
            </div>

            <div className="spacer py-2 border-b-1 border-gray-400"></div>

            <div className="cartTotal flex justify-between items-center py-1 text-red-500 text-xl font-bold">
              <p>Order Total:</p>
              <p className="inline-flex items-center">
                <MdOutlineCurrencyRupee /> <span>{totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
