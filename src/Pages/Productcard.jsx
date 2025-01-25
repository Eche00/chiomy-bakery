import { ArrowBackIos, Favorite } from "@mui/icons-material";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../lib/firebase";

function Productcard() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtredData = productData.filter((product) => product.id === id);
        console.log(filtredData);

        setProduct(filtredData);
      },
      (error) => {
        console.error("Error fetching real-time data: ", error);
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // handle like
  const handleLike = async (productId) => {
    try {
      // Get the current user's UID

      if (!currentUser) {
        navigate("/signin");
      }

      const userRef = doc(db, "users", currentUser.uid);

      // Check if the user document exists
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Add the product ID to the likes array
      await updateDoc(userRef, {
        likes: arrayUnion(productId), // Add the product ID to the 'likes' array
      });

      console.log("Product added to likes successfully!");
    } catch (error) {
      console.error("Error liking the product:", error);
    }
  };
  return (
    <div className=" bg-black md:pb-0 pb-[100px] h-screen relative">
      <Link className=" fixed md:top-48 md:left-20 top-40 left-6" to="/product">
        <ArrowBackIos />
      </Link>
      <button
        onClick={() => handleLike(product[0]?.id)}
        className="absolute top-3 right-2">
        <Favorite />
      </button>
      <article className=" h-full flex  md:flex-row flex-col overflow-y-scroll overflow-x-hidden">
        <div className=" flex flex-1  items-center justify-center md:mb-[150px]  ">
          <img
            className="md:w-[600px] md:h-[600px] h-[235px] object-cover md:rounded-[20px] rounded-[8px] bg-white"
            src={product[0]?.imageUrl}
            alt=""
          />
        </div>
        <div className=" flex flex-col md:flex-1  md:mt-[150px] items-start">
          <div className=" flex flex-col gap-3 w-screen md:w-fit sm:px-[60px] px-[20px] md:px-0 ">
            <h3 className=" md:text-3xl text-2xl   font-bold flex gap-2 text-white ">
              {product[0]?.name}
              <p>{product[0]?.price}</p>
            </h3>

            <p className=" text-3xl  font-bold text-pink-600">
              ₦ <span>{product[0]?.price}</span>
            </p>

            <p className=" text-md  md:w-[600px] w-[300px]">
              {" "}
              <b className=" text-3xl">Details</b> <br />
              <b className=" text-black">{product[0]?.category}</b>{" "}
              {product[0]?.details}
            </p>
          </div>

          <div className="flex  justify-between items-center   w-screen md:w-[70%] px-[15px] md:px-0 py-5 md:py-0">
            <button className="bg-pink-600 rounded-[8px] w-full py-2 m-2  text-white text-center">
              Order
            </button>
            <Link to="/product">
              <button className="bg-[#efefef] flex justify-between items-center px-5 rounded-[8px] w-full py-2 m-2 text-center  text-black outline-none">
                Product
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Productcard;
