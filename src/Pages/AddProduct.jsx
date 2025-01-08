import { AddAPhoto } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { db, storageF } from "../lib/firebase";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    details: "",
    image: [],
  });
  const [files, setFiles] = useState([]);
  const imageRef = useRef();

  // Handle file selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Create a storage reference for the image
      const storageRef = ref(storageF, `images/${selectedFile.name}`);

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
        },
        (error) => {
          // Handle errors here
          console.error(error);
        },
        () => {
          // On successful upload, get the file URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Set the file and URL in the formData
            setFormData((prevData) => ({
              ...prevData,
              image: [{ file: selectedFile, url: downloadURL }],
            }));
            setFiles([{ url: downloadURL, file: selectedFile }]);
          });
        }
      );
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save form data (including image URL) to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        details: formData.details,
        imageUrl: formData.image[0].url, // Store the image URL in Firestore
      });

      console.log("Document written with ID: ", docRef.id);
      // Reset the form after successful submission
      setFormData({
        name: "",
        price: "",
        category: "",
        details: "",
        image: [],
      });
      setFiles([]);
    } catch (e) {
      console.error("Error adding document: ", e);
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
              name="category"
              onChange={handleChange}
              value={formData.category}>
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Cake" name="Cake">
                Cake
              </option>
              <option value="Pastries" name="Pastries">
                Pastries
              </option>
              <option value="Bread" name="Bread">
                Bread
              </option>
              <option value="Decorations" name="Decorations">
                Decorations
              </option>
              <option value="Gift Packs" name="Gift Packs">
                Gift Packs
              </option>
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
