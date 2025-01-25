import {
  ArrowBackIos,
  ArrowCircleRightOutlined,
  Favorite,
} from "@mui/icons-material";
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
  const [relatedProduct, setRelatedProduct] = useState([]);
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

        setProduct(filtredData);

        if (filtredData.length >= 1) {
          const category = filtredData[0].category;
          const RelatedData = productData
            .filter((product) => product.category === category)
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 4);

          setRelatedProduct(RelatedData);
        }
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
    <div className=" pb-[100px] w- full flex flex-col h-fit md:pt-[100px] pt-[50px] ">
      <div className=" bg-black  h-fit relative  w-full md:pb-[20px]">
        <Link
          className=" fixed md:top-40 md:left-10 top-40 left-6 z-10"
          to="/product">
          <ArrowBackIos />
        </Link>

        <section className=" flex  w-[90%] mx-auto sm:flex-row flex-col sm:gap-[20px] gap-0  items-center md:items-end">
          <img
            className="md:w-[500px] md:h-[500px]  w-[70%] h-[300px] object-cover md:rounded-[20px] rounded-[8px] bg-white  mb-[50px] md:mb-0"
            src={product[0]?.imageUrl}
            alt=""
          />

          <div className=" flex flex-col flex-1  sm:mt-[150px] items-start w-full ">
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

            <div className="flex  justify-between items-center   w-full md:w-[50%] px-[15px] md:px-0 py-5 md:py-0">
              <button className="bg-pink-600 rounded-[8px] w-full py-2 m-2  text-white text-center">
                Order
              </button>
              <Link to="/product">
                <button
                  className="bg-[#efefef] flex  justify-center items-center px-5 rounded-[8px] w-full py-2 m-2 text-center  text-black outline-none"
                  onClick={() => handleLike(product[0]?.id)}>
                  <Favorite />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className=" sm:w-[80%] md:w-[90%] mx-auto ">
        <h2 className=" text-xl font-bold">Related Products</h2>

        {/* grid template  */}
        <div className="  grid  sm:flex sm:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
          {relatedProduct.length > 0 ? (
            relatedProduct.map((product) => (
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
                    <i className=" text-[14px] md:text-[20px] font-semibold">
                      &#8358; {product.price}
                    </i>
                    <button className="absolute top-3 right-2">
                      <Favorite />
                    </button>
                    <button className="border-2 border-white shadow-black shadow-md rounded-[8px] md:w-[50%] w-[40%] md:py-2 py-1 m-2  text-white text-center">
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
      </section>
    </div>
  );
}

export default Productcard;
