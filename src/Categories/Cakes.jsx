import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Favorite } from "@mui/icons-material";

function Cakes() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className=" pb-[100px] flex flex-wrap gap-[20px]">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            className=" w-[90%] mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm"
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
                <button>
                  <Favorite />
                </button>
              </section>
            </div>
          </div>
        ))
      ) : (
        <p>Nothing to see here</p>
      )}
    </div>
  );
}

export default Cakes;
