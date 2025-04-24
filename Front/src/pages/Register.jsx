import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axiosConfig";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleConfirmPassword(e) {
    if (e.target.value !== data.password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const repsonse = await instance.post("/user/register", data, {
        withCredentials: true,
      });
      console.log(repsonse.data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center">Register</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Choose a Strong Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              onChange={handleConfirmPassword}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {!passwordMatch ? <span>Passwords do not match</span> : ""}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
          <p className="text-center">
            Already register?{" "}
            <Link
              to="/user/login"
              className="text-blue-500 hover:text-blue-600"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
