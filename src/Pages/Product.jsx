import React, { useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";

function Product() {
  const currentUser = auth.currentUser;
  const [products, setProducts] = useState([]);
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

        const filtredData = productData.filter(
          (product) => product.category === "Cake"
        );
        setProducts(filtredData);
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
    <div className=" pb-[100px] flex  flex-col  pt-[30px]">
      <h1 className=" font-extrabold text-[20px]">Cakes</h1>

      <div className=" pb-[100px] flex flex-wrap gap-[20px] pt-[30px]">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className=" md:w-[300px] w-[90%] md:mx-0 mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm"
              key={product.id}>
              <img
                className="w-full h-[250px] object-cover "
                src={product.imageUrl}
                alt=""
              />

              <div className="p-[10px] flex  flex-col gap-[10px]">
                <p className=" text-[20px] font-[600]">{product.category}</p>

                <section className="flex justify-between items-center">
                  <i className=" text-[20px] font-semibold">
                    &#8358; {product.price}
                  </i>
                  <button onClick={() => handleLike(product.id)}>
                    <Favorite />
                  </button>
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to see here</p>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default Product;
