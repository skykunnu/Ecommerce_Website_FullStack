/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";
import DisplayProduct from "../Components/DisplayProduct";
import { Link } from "react-router-dom";


// Home component is responsible for fetching and displaying the list of products.

function Home() {
  const { product, loading, fetchProduct } = useEcom();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) fetchProduct(page);
    else fetchProduct();
  }, [page]);
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="pagination my-3 text-center py-5">
        {product.currentPage > 1 && (
          <Link
            to={`?page=${product.currentPage - 1}`}
            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
            onClick={() => setPage(product.currentPage - 1)}
          >
            Previous
          </Link>
        )}
        {Array.from({ length: product.totalPage }).map((_, index) => {
          return (
            <Link
              key={index}
              to={`?page=${index + 1}`}
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Link>
          );
        })}

        {product.currentPage < product.totalPage && (
          <Link
            to={`?page=${product.currentPage + 1}`}
            className="bg-blue-500 text-white rounded p-1 mx-2 px-2  cursor-pointer"
            onClick={() => setPage(product.currentPage + 1)}
          >
             Next 
          </Link>
        )}
      </div>
      <DisplayProduct product={product} />
    </>
  );
}

export default Home;
