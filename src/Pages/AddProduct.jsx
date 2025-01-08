import { AddAPhoto } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import {
  handleCreateProperty,
  handleImageUpload,
} from "../lib/uploadFormLogic";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [formData, setFormData] = useState({
    image: [],
    name: "",
    category: "",
    price: "",
    details: "",
    name: "",
    name: "",
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const imageRef = useRef();
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file

    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a preview URL
      setFiles([{ file, url: imageUrl }]); // Save only one file with its URL

      // Update formData with the file
      setFormData({
        ...formData,
        image: [{ file, url: imageUrl }], // Store the file in formData.image
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload images
      let updatedFormData = await handleImageUpload(files, formData);
      console.log(updatedFormData);

      // Create property in Firebase
      // await handleCreateProperty(updatedFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
    }
  };
  return (
    <div className=" h-screen">
      <main className=" relative  mb-[50px]">
        <form
          className="w-[90%] mx-auto overflow-scroll  h-fit pb-[100px]"
          onSubmit={handleSubmit}>
          <div className=" flex items-startgap-[5px] my-5 gap-[10px]">
            <label
              htmlFor="image"
              className=" border-2 w-fit rounded-full p-3 border-pink-600 "
              ref={imageRef}>
              <AddAPhoto />
            </label>

            <p className=" text-[14px] font-[400]">Add Photo</p>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <div>
            {files.length > 0 && (
              <div>
                <img
                  src={files[0].url}
                  alt={files[0].file.name}
                  className="w-full h-[300px] rounded-[10px] object-cover"
                />
              </div>
            )}
          </div>
          <div className=" flex flex-col gap-[5px] my-5">
            <p>Name</p>
            <input
              className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className=" flex flex-col gap-[5px] my-5">
            <p>Price</p>
            <input
              className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
              type="text"
              name="price"
              onChange={handleChange}
              id="price"
              value={formData.price}
              required
            />
          </div>
          <div className=" flex flex-col gap-[5px] my-5">
            <p>category</p>

            <select
              className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5  py-2 outline-none"
              required
              id="category"
              onChange={handleChange}
              value={formData.category}>
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Cake">Cake</option>
              <option value="Pastries">Pastries</option>
              <option value="Bread">Bread</option>
              <option value="Decorations">Decorations</option>
              <option value="Gift Packs">Gift Packs</option>
            </select>
          </div>
          <div className=" flex flex-col gap-[5px] my-5">
            <p>Details</p>

            <textarea
              className=" bg-transparent border-2 border-pink-600 w-full rounded-[10px] px-5 py-2 outline-none"
              name="details"
              id="details"
              cols="30"
              onChange={handleChange}
              rows="10"
              required
              value={formData.details}></textarea>
          </div>

          <button
            className="bg-pink-600  py-[15px] text-[16px] font-bold text-white rounded-full my-[10px] w-full"
            type="submit">
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddProduct;
