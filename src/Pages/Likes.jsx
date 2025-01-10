import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Favorite } from "@mui/icons-material";

function Likes() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        // Get the current user

        if (!currentUser) {
          console.error("No user logged in");
          return;
        }

        // Reference the user's document
        const userRef = doc(db, "users", currentUser.uid);

        // Get the user's document
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          console.error("User document not found");
          return;
        }

        // Get the 'likes' array from the user's document
        const { likes } = userDoc.data();

        if (likes && likes.length > 0) {
          // Retrieve the liked products from the products collection
          const likedProductsData = await Promise.all(
            likes.map(async (productId) => {
              const productRef = doc(db, "products", productId);
              const productDoc = await getDoc(productRef);
              if (productDoc.exists()) {
                return { id: productDoc.id, ...productDoc.data() };
              }
              return null;
            })
          );

          // Filter out any null values (in case a product was deleted)
          setLikedProducts(likedProductsData.filter((item) => item !== null));
        } else {
          console.log("No liked items found");
          setLikedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching liked items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
  }, []);

  if (loading) {
    return (
      <div className=" text-center font-[400] text-[16px] ">
        Loading liked items...
      </div>
    );
  }

  return (
    <div className="py-[20px] flex  flex-col gap-[20px]">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">
        Favourites
      </h2>
      {likedProducts.length > 0 ? (
        likedProducts.map((product) => (
          <div
            className=" md:w-[300px] w-[90%] md:mx-0 mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm flex"
            key={product.id}>
            <img
              className="w-[50%] h-[150px] object-cover "
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
        <p>You have no liked items.</p>
      )}
    </div>
  );
}

export default Likes;
