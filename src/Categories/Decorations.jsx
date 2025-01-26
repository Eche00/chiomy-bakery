import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Favorite, ArrowCircleRightOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";

function Decorations() {
  const currentUser = auth.currentUser;
  const [products, setProducts] = useState([]);
  const [productsMax, setProductsMax] = useState([]);
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

        const filtredData = productData
          .filter((product) => product.category === "Decorations")
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 4);
        const filtredDataMax = productData
          .filter((product) => product.category === "Decorations")
          .slice(0, 2);

        setProducts(filtredData);
        setProductsMax(filtredDataMax);
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

  const handleView = (productId) => {
    navigate(`/productcard/${productId}`);
  };

  return (
    <div className="  flex  flex-col  pt-[30px]  overflow-hidden">
      <h1 className=" font-extrabold text-[20px]">Decorations</h1>

      <div className="  overflow-scroll w-full ">
        <div className="flex items-center gap-[10px] overflow-scroll w-fit ">
          {" "}
          {products.length > 0 &&
            products.map((product) => (
              <div className=" w-fit pt-5 backdrop-blur-sm" key={product.id}>
                <img
                  className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] object-cover  rounded-full"
                  src={product.imageUrl}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
      {/* grid template  */}
      <div className="  grid  md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className=" md:w-[300px] w-[95%] md:mx-0 mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm"
              key={product.id}>
              <img
                className="w-full h-[150px] object-cover md:h-[250px]"
                src={product.imageUrl}
                alt=""
              />

              <div className="p-[10px] flex  flex-col md:gap-[10px] gap-[5px]">
                <p className=" md:text-[20px] text-[16px] font-[600]">
                  {product.name}
                </p>

                <section className="flex justify-between items-center">
                  <i className=" text-[16px] md:text-[20px] font-semibold">
                    &#8358; {numeral(product.price).format("0,0")}
                  </i>
                  <button
                    onClick={() => handleLike(product.id)}
                    className="absolute top-3 right-2">
                    <Favorite />
                  </button>
                  <button
                    onClick={() => handleView(product.id)}
                    className="border-2 border-white shadow-black shadow-md rounded-[8px] md:w-[50%] w-[40%] md:py-2 py-1 m-2  text-white text-center">
                    Order
                  </button>
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to see here</p>
        )}
        <div>
          {/* see more  */}
          <section className=" md:flex hidden items-center justify-center w-full h-full text-pink-600">
            {" "}
            <Link to="/product">
              <ArrowCircleRightOutlined fontSize="large" />
            </Link>
          </section>
        </div>
      </div>

      {/* 2 solid display  */}
      <div className="  flex md:hidden flex-wrap gap-[20px] pt-[30px] items-center">
        {productsMax.length > 0 ? (
          productsMax.map((product) => (
            <div
              className=" md:w-[300px] w-[90%] md:mx-0 mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm"
              key={product.id}>
              <img
                className="w-full h-[250px] object-cover "
                src={product.imageUrl}
                alt=""
              />

              <div className="p-[10px] flex  flex-col gap-[10px]">
                <p className=" text-[20px] font-[600]">{product.name}</p>

                <section className="flex justify-between items-center">
                  <i className=" text-[20px] font-semibold">
                    &#8358; {numeral(product.price).format("0,0")}
                  </i>
                  <button
                    onClick={() => handleLike(product.id)}
                    className="absolute top-3 right-2">
                    <Favorite />
                  </button>
                  <button
                    onClick={() => handleView(product.id)}
                    className="border-2 border-white shadow-black shadow-md rounded-[8px] w-[50%] py-2 m-2  text-white text-center">
                    Order
                  </button>
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to see here</p>
        )}
        <div className=" flex items-center justify-center text-center w-full">
          <Link
            to="/product"
            className="x underline text-sm text-pink-600 font-bold">
            More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Decorations;
