import React, { useEffect, useState } from "react";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";
import Loading from "../Components/Loading";

function Likes() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(1000);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const handleRemoveLike = async (productId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
      }

      const userRef = doc(db, "users", currentUser.uid);

      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Remove the product from the 'likes' array
      await updateDoc(userRef, {
        likes: arrayRemove(productId),
      });

      // Reset the product's quantity to 1 in localStorage
      const updatedQuantities =
        JSON.parse(localStorage.getItem("quantities")) || {};
      delete updatedQuantities[productId]; // Remove this product from the stored quantities
      localStorage.setItem("quantities", JSON.stringify(updatedQuantities));

      // Also reset the quantity state
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[productId]; // Reset quantity for the removed product
        return updatedQuantities;
      });

      console.log("Product removed from likes and quantity reset!");
    } catch (error) {
      console.error("Error Unliking the product:", error);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[productId] = Math.max(
        1,
        (updatedQuantities[productId] || 1) + delta
      ); // Min 1 quantity
      localStorage.setItem("quantities", JSON.stringify(updatedQuantities)); // Save to localStorage
      return updatedQuantities;
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchLikedItems = () => {
      try {
        if (!currentUser) {
          console.error("No user logged in");
          return;
        }

        const userRef = doc(db, "users", currentUser.uid);

        const unsubscribe = onSnapshot(userRef, async (userDoc) => {
          if (!userDoc.exists()) {
            console.error("User document not found");
            return;
          }

          const { likes } = userDoc.data();
          if (likes && likes.length > 0) {
            const likedProductsData = await Promise.all(
              likes.map(async (productId) => {
                const productRef = doc(db, "products", productId);
                const productDoc = await getDoc(productRef);
                setLoading(false);
                if (productDoc.exists()) {
                  return { id: productDoc.id, ...productDoc.data() };
                }
                return null;
              })
            );
            const Liked = likedProductsData.filter((item) => item !== null);
            setLikedProducts(Liked);

            // Initialize quantities with 1 for all liked products
            const storedQuantities =
              JSON.parse(localStorage.getItem("quantities")) || {};
            const initialQuantities = Liked.reduce((acc, product) => {
              acc[product.id] = storedQuantities[product.id] || 1; // Use stored quantity or default to 1
              return acc;
            }, {});
            setQuantities(initialQuantities);
          } else {
            console.log("No liked items found");
            setLikedProducts([]);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching liked items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
  }, [currentUser]);

  // Calculate subtotal and total price dynamically based on quantities
  useEffect(() => {
    let newSubTotal = 0;
    likedProducts.forEach((product) => {
      const productQuantity = quantities[product.id] || 1; // Default to 1 if no quantity is set
      const productTotal = product.price * productQuantity;
      newSubTotal += productTotal;
    });
    setSubTotalPrice(newSubTotal);
  }, [likedProducts, quantities]);

  useEffect(() => {
    const newTotal = subTotalPrice + deliveryPrice;
    setTotalPrice(newTotal);
  }, [subTotalPrice, deliveryPrice]);

  if (loading) {
    return (
      <div className=" text-center font-[400] text-[16px] py-[20px]">
        <Loading />
      </div>
    );
  }

  const handleView = (productId) => {
    navigate(`/productcard/${productId}`);
  };

  return (
    <div className="py-[20px] flex flex-col gap-[20px] pb-[100px]">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">
        Favourites
      </h2>
      {likedProducts.length > 0 ? (
        <div className="md:w-[70%] w-full mx-auto flex md:flex-column sm:flex-row flex-col gap-[20px] md:gap-[50px] ">
          <section className="flex flex-col gap-[10px] w-full items-center sm:border-2 border-pink-600 rounded-[10px] p-[20px] flex-1 h-fit">
            {likedProducts.map((product) => {
              const quantity = quantities[product.id] || 1; // Default to 1 if no quantity is set
              const productTotal = product.price * quantity;

              return (
                <div
                  className="w-[95%] bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm flex h-fit"
                  key={product.id}>
                  <img
                    className="w-[35%] md:w-[50%] md:h-[200px] h-[150px] object-cover "
                    src={product.imageUrl}
                    alt=""
                  />

                  <div className="py-[5px] px-[10px] flex flex-col gap-[5px] justify-end w-full">
                    <p className="md:text-[14px] text-[12px] font-[600]  flex">
                      {product.name}
                      <span className="flex justify-between md:items-center">
                        <i className="font-semibold">
                          ( &#8358; {numeral(product.price).format("0,0")} )
                        </i>
                      </span>
                    </p>

                    <section className="flex justify-between items-center w-full">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-[5px]">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="bg-pink-600 text-white px-2 py-1 rounded-full">
                          -
                        </button>
                        <span className="text-[14px] font-[600] bg-black px-3 rounded-[5px]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="bg-pink-600 text-white px-2 py-1 rounded-full">
                          +
                        </button>
                      </div>
                      {/* Product Total Price */}
                      <div className="flex items-center justify-between">
                        <i className="text-[16px] font-semibold">
                          &#8358; {numeral(productTotal).format("0,0")}
                        </i>
                      </div>
                    </section>
                    {/* delete section  */}
                    <section className=" w-full flex items-end justify-end">
                      <button
                        onClick={() => handleRemoveLike(product.id)}
                        className="border-2 border-white shadow-black shadow-md rounded-[8px] md:w-[200px] w-[80px] py-2 m-2 text-white text-center ">
                        <Delete fontSize="small" />
                      </button>
                    </section>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Order summary */}
          {likedProducts.length > 0 && (
            <section className="border-2 border-pink-600 rounded-[10px] p-[20px] flex sm:w-[30%] w-full flex-col gap-[20px] h-fit">
              <h2 className=" text-center font-[400] text-[14px] pb-[20px]">
                Order summary
              </h2>
              <div className="flex flex-col w-full gap-[5px] border-b-[0.5px] border-pink-600 pb-[10px]">
                <p className=" flex items-center justify-between text-sm font-[500]">
                  Sub Total{" "}
                  <span className="font-bold">
                    &#8358; <i>{subTotalPrice.toLocaleString()}</i>
                  </span>
                </p>
                <p className=" flex items-center justify-between text-sm font-[500]">
                  Discount{" "}
                  <span className="font-bold">
                    &#8358; <i>00.00</i>
                  </span>
                </p>
                <p className=" flex items-center justify-between text-sm font-[500]">
                  Delivery Fee{" "}
                  <span className="font-bold">
                    &#8358; <i>{deliveryPrice.toLocaleString()}</i>
                  </span>
                </p>
              </div>

              {/* Total */}
              <div className="flex flex-col w-full gap-[10px]">
                <p className=" flex items-center justify-between text-[16px] font-[500]">
                  Total{" "}
                  <span className="font-bold">
                    &#8358; <i>{totalPrice.toLocaleString()}</i>
                  </span>
                </p>
                <Link
                  to="/checkout"
                  className="bg-pink-600 py-[15px] text-[16px] font-bold text-white rounded-full my-[10px] w-full text-center"
                  type="submit">
                  Check out
                </Link>
              </div>
            </section>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Likes;
