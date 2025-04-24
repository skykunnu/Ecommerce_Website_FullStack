/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useAdminAuth } from "./Context/AdminAuthProvider";

function AdminLogin() {
  const navigate = useNavigate();
  const { checkAuthAdmin } = useAdminAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.post("/admin/login", data, {
        withCredentials: true,
      });
      checkAuthAdmin();
      if (
        response.status === 200 &&
        response.data.message === "Login Successfull"
      ) {
        navigate("/admin/home");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
