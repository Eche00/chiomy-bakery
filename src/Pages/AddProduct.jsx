import { AddAPhoto } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { db, storageF } from "../lib/firebase";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    details: "",
    image: [],
    createdAt: "",
  });
  const [files, setFiles] = useState([]);
  const imageRef = useRef();

  // error and loading
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSucesss] = useState(false);

  // Handle file selection
  const handleImageChange = (e) => {
    setLoading(true);
    setImgError(false);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Create a storage reference for the image
      const storageRef = ref(storageF, `images/${selectedFile.name}`);

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercentage.toFixed(0)); // Update progress state
        },
        (error) => {
          // Handle errors here
          console.error(error);
          setImgError(true);
          setLoading(false);
          setSucesss(false);
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
            setLoading(false);
            setImgError(false);
            setSucesss(false);
          });
        }
      );
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setError(false);
    setSucesss(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setImgError(false);
    setSucesss(false);

    if (files.length <= 0) {
      return;
    }
    try {
      // Save form data (including image URL) to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        details: formData.details,
        imageUrl: formData.image[0].url, // Store the image URL in Firestore
        createdAt: serverTimestamp(),
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
      setLoading(false);
      setError(false);
      setSucesss(true);
      setTimeout(() => {
        setSucesss(false);
        setProgress(null);
      }, 2000);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(true);
      setSucesss(false);
    }
  };

  return (
    <div className=" h-screen">
      <main className=" relative  mb-[50px]">
        {/* form success  */}
        {success && (
          <div className=" fixed top-[0] w-full h-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center">
            <p className=" bg-black border-2 border-pink-600 font-bold text-[20px] px-[30px] py-[10px] rounded-[10px] backdrop-blur-sm">
              product Added!
            </p>
          </div>
        )}

        <form
          className="md:w-[40%] w-[90%] mx-auto overflow-scroll  h-fit pb-[100px]"
          onSubmit={handleSubmit}>
          <div className=" flex items-startgap-[5px] my-5 gap-[10px]">
            <label
              htmlFor="image"
              className=" border-2 w-fit rounded-full p-3 border-pink-600 "
              ref={imageRef}>
              <AddAPhoto />
            </label>

            <p className=" text-[14px] font-[400]">
              Add Photo <br />
              {progress > 0 && (
                <span className=" text-sm ">
                  Upload Progress:{" "}
                  <span className=" text-green-600">{progress}%</span>
                </span>
              )}
              {imgError > 0 && (
                <span className=" text-sm text-red-600">Upload Failed</span>
              )}
            </p>
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
              type="number"
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
            {loading ? "Adding..." : "Add Product"}
          </button>
          {error && (
            <p className=" text-lg  py-[5px] text-red-600 text-center font-bold">
              Error uploading form <br />
              <span className="text-sm text-white">please try again!</span>
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

export default AddProduct;
