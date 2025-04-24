/* eslint-disable no-unused-vars */
import { useState } from "react";
import instance from "../axiosConfig";

function AddCategory() {
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "image") value = e.target.files[0];
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const frm = new FormData();
      frm.append("name", form.name);
      frm.append("image", form.image);
      const response = await instance.post("/product/category/add", frm, {
        withCredentials: true,
      });
      console.log(response.data);
      setForm({
        name: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4">
        <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center">Add Category</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form action="" encType="multipart/form-data" onSubmit={handleSubmit} className='flex flex-col gap-3 items-center justify-between space-y-6' >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter the name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
