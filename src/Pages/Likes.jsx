import React, { useEffect, useState } from "react";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Delete, Favorite, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";

function Likes() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const handleRemoveLike = async (productId) => {
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
        likes: arrayRemove(productId), // Add the product ID to the 'likes' array
      });

      console.log("Product removed from likes successfully!");
    } catch (error) {
      console.error("Error Unliking the product:", error);
    }
  };
  useEffect(() => {
    const fetchLikedItems = () => {
      try {
        // Check if the user is logged in
        if (!currentUser) {
          console.error("No user logged in");
          return;
        }

        // Reference the user's document
        const userRef = doc(db, "users", currentUser.uid);

        // Set up a real-time listener for the user's document
        const unsubscribe = onSnapshot(userRef, async (userDoc) => {
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
        });

        // Return the unsubscribe function so you can stop listening when needed
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching liked items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
  }, [handleRemoveLike]);

  if (loading) {
    return (
      <div className=" text-center font-[400] text-[16px] py-[20px]">
        Loading liked items...
      </div>
    );
  }
  const handleView = (productId) => {
    navigate(`/productcard/${productId}`);
  };
  return (
    <div className="py-[20px] flex  flex-col gap-[20px] pb-[100px]">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">
        Favourites
      </h2>
      <div className="   md:w-[50%] w-full mx-auto flex  md:flex-column  sm:flex-row flex-col gap-[20px] ">
        <section className="flex flex-col gap-[10px] w-full    items-center sm:border-2 border-pink-600 rounded-[10px] p-[20px] flex-1 h-fit">
          {likedProducts.length > 0 ? (
            likedProducts.map((product) => (
              <div
                className="  w-[95%]  bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm flex"
                key={product.id}>
                <img
                  className="w-[50%] md:h-[200px] h-[150px] object-cover "
                  src={product.imageUrl}
                  alt=""
                />

                <div className="py-[5px] px-[10px] flex  flex-col gap-[5px] justify-end  ">
                  <p className=" text-[14px] font-[600]">{product.name}</p>

                  <section className="flex  justify-between md:items-center">
                    <i className=" text-[16px] font-semibold">
                      &#8358; {numeral(product.price).format("0,0")}
                    </i>
                    <button onClick={() => handleRemoveLike(product.id)}>
                      <Delete fontSize="small" />
                    </button>
                  </section>
                  <button
                    onClick={() => handleView(product.id)}
                    className="border-2 border-white shadow-black shadow-md rounded-[8px] w-[100%] py-2 m-2  text-white text-center">
                    Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>You have no liked items.</p>
          )}
        </section>
        {/* section 2 */}
        <section className="border-2 border-pink-600 rounded-[10px] p-[20px] flex  sm:w-[30%] w-full flex-col gap-[20px] h-fit">
          <h2 className=" text-center font-[400] text-[14px] pb-[20px]">
            Order summary
          </h2>
          <div className="flex flex-col w-full gap-[5px] border-b-[0.5px] border-pink-600 pb-[10px]">
            <p className=" flex items-center justify-between text-sm font-[500]">
              Sub Total{" "}
              <span className="font-bold">
                {" "}
                &#8358; <i>200</i>
              </span>
            </p>
            <p className=" flex items-center justify-between text-sm font-[500]">
              Discount{" "}
              <span className="font-bold">
                {" "}
                &#8358; <i>200</i>
              </span>
            </p>
            <p className=" flex items-center justify-between text-sm font-[500]">
              Delivery Fee{" "}
              <span className="font-bold">
                {" "}
                &#8358; <i>200</i>
              </span>
            </p>
          </div>
          {/* total  */}
          <div className="flex flex-col w-full gap-[10px]">
            <p className=" flex items-center justify-between text-[16px] font-[500]">
              Total{" "}
              <span className="font-bold">
                {" "}
                &#8358; <i>200</i>
              </span>
            </p>
            <button
              className="bg-pink-600  py-[15px] text-[16px] font-bold text-white rounded-full my-[10px] w-full"
              type="submit">
              Check Out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Likes;
