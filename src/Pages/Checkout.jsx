import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Loading from "../Components/Loading";
import numeral from "numeral";

function Checkout() {
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({});
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0); // Fixed Delivery Fee
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const userDataRef = collection(db, "users");
    getDocs(userDataRef)
      .then((querySnap) => {
        const userData = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredUser = userData.find(
          (prop) => prop.id === currentUser?.uid
        );

        setUser(filteredUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving document:", error);
      });
  }, [currentUser]);

  // Fetch liked items
  useEffect(() => {
    setLoading(true);
    const fetchLikedItems = () => {
      try {
        if (!currentUser) {
          console.error("No user logged in");
          navigate("/signin");
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

  // Calculate subtotal and total price dynamically
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

  // Handle form submission and save order to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an order object
    const orderData = {
      userId: currentUser.uid,
      name,
      email,
      address,
      city,
      state,
      mobile,
      products: likedProducts.map((product) => ({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantities[product.id] || 1,
        total: product.price * (quantities[product.id] || 1),
      })),
      subTotalPrice,
      deliveryPrice,
      totalPrice,
      createdAt: new Date(),
    };

    try {
      // Add order to Firestore
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      // After successful order creation, clear the user's liked items in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        likes: [], // Set the liked items to an empty array
      });

      // After successful order creation, navigate to the order confirmation page
      navigate(`/order/${orderRef.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center font-[400] text-[16px] py-[20px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="py-[20px] flex flex-col gap-[20px] pb-[100px]">
      <h2 className="text-center font-[400] text-[18px] pb-[20px]">
        Check Out
      </h2>
      <div className="md:w-[70%] w-full mx-auto flex md:flex-column sm:flex-row flex-col gap-[30px] md:gap-[50px] justify-between">
        {/* Delivery Info Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:w-[50%] gap-[10px] px-[10px]">
          <h2 className="font-[400] text-[16px] pb-[10px]">Delivery Info -</h2>
          <div className="flex items-center gap-[10px]">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="Name"
            />
            <input
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="Email"
            />
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <input
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="Enter home Address"
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <input
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="City"
            />
            <input
              required
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="State"
            />
          </div>
          <div className="w-full">
            <input
              required
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full outline-none w-full"
              placeholder="Mobile Number"
            />
          </div>
          <button
            className="bg-pink-600 py-[10px] text-[14px] font-bold text-white rounded-full my-[10px] w-full text-center"
            type="submit">
            Confirm Order
          </button>
        </form>

        {/* Order Summary Section */}
        <section className="border-2 border-pink-600 rounded-[10px] p-[20px] flex sm:w-[30%] w-full flex-col gap-[20px] h-fit">
          <h2 className="text-center font-[400] text-[14px] pb-[20px]">
            Order summary
          </h2>
          <div className="flex flex-col w-full gap-[5px] border-b-[0.5px] border-pink-600 pb-[10px]">
            <p className="flex items-center justify-between text-sm font-[500]">
              Sub Total{" "}
              <span className="font-bold">
                &#8358; <i>{subTotalPrice.toLocaleString()}</i>
              </span>
            </p>
            <p className="flex items-center justify-between text-sm font-[500]">
              Delivery Fee{" "}
              <span className="font-bold">
                &#8358; <i>{deliveryPrice.toLocaleString()}</i>
              </span>
            </p>
          </div>
          <p className="flex items-center justify-between text-[14px] font-[600]">
            Total{" "}
            <span className="font-bold">
              &#8358; <i>{totalPrice.toLocaleString()}</i>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
