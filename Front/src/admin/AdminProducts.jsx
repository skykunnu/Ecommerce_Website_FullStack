import { Link } from "react-router-dom";
import { useAdminEcom } from "./Context/AdminEcomProvider";
import { useEffect, useState } from "react";

function AdminProducts() {
  const { product, fetchProduct,deleteProductOrCategory} = useAdminEcom();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) fetchProduct(page);
    else fetchProduct();
  }, [page]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/5 ml-3 p-2 bg-gray-200 rounded h-screen">
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        <ul className="mt-4">
          <li className="py-2">
            <Link to="/admin/home">Dashboard</Link>
          </li>
          <li className="py-2">
            <Link to="">Products</Link>
          </li>
          <li className="py-2">
            <Link to="">Orders</Link>
          </li>
          <li className="py-2">
            <Link to="">Users</Link>
          </li>
        </ul>
      </aside>
      <main className="w-4/5 p-4">
        <h2 className="text-2xl font-bold mb-3">Products</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product?.products?.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className={`mb-2 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.OriginalPrice}</td>
                  <td className="p-2">{item.discountedPrice}</td>
                  <td className="p-2">{item.category.name}</td>
                  <td>
                    <button className="bg-red-500 text-white p-1 rounded cursor-pointer" onClick={()=>deleteProductOrCategory(item._id,"product")}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination my-3">
          {product.currentPage > 1 && (
            <Link
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              to={`?page=${product.currentPage - 1}`}
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
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              to={`?page=${product.currentPage + 1}`}
              onClick={() => setPage(product.currentPage + 1)}
            >
              Next
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminProducts;
