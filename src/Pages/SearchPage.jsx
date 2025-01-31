import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import Loading from "../Components/Loading";
import { Favorite } from "@mui/icons-material";
import numeral from "numeral";

const SearchPage = () => {
  const currentUser = auth.currentUser;
  const [products, setProducts] = useState([]); // Fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term from URL
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL)
  const [likedProducts, setLikedProducts] = useState(new Set()); // Track liked products by ID

  // Extract search term from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query"); // Get the 'query' query parameter
    setSearchTerm(searchQuery || ""); // Set the search term if it exists
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from Firestore
        const productsCollectionRef = collection(db, "products");
        const querySnapshot = await getDocs(productsCollectionRef);

        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter products based on the search term
        const filteredProducts = productData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    // Only fetch products if the search term is not empty
    if (searchTerm) {
      setLoading(true);
      fetchProducts();
    } else {
      setLoading(false);
      setProducts([]); // Clear products when search term is empty
    }
  }, [searchTerm]);

  const handleView = (productId) => {
    navigate(`/productcard/${productId}`);
  };

  const handleLike = async (productId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current liked products from Firestore
      const { likes } = userDoc.data();
      const isLiked = likes && likes.includes(productId);

      // Toggle like/unlike: If the product is liked, remove it; if it's not liked, add it
      const updatedLikes = isLiked
        ? likes.filter((id) => id !== productId) // Remove product from likes
        : [...likes, productId]; // Add product to likes

      // Update Firestore likes array
      await updateDoc(userRef, {
        likes: updatedLikes,
      });

      // Update the local liked products state
      setLikedProducts(new Set(updatedLikes));

      console.log(
        isLiked ? "Product removed from likes" : "Product added to likes"
      );
    } catch (error) {
      console.error("Error toggling like on the product:", error);
    }
  };

  // Fetch current user's liked products
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (userDoc) => {
        if (userDoc.exists()) {
          const { likes = [] } = userDoc.data();
          setLikedProducts(new Set(likes)); // Update the liked products set
        }
      });

      return () => unsubscribe(); // Cleanup the listener on unmount
    }
  }, [currentUser]);

  return (
    <div className="pb-[100px]">
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="md:w-[300px] w-[95%] md:mx-0 mx-auto bg-pink-600 rounded-[20px] overflow-hidden backdrop-blur-sm"
                key={product.id}>
                <img
                  className="w-full h-[150px] object-cover md:h-[250px]"
                  src={product.imageUrl}
                  alt=""
                />

                <div className="p-[10px] flex flex-col md:gap-[10px] gap-[5px]">
                  <p className="md:text-[20px] text-[16px] font-[600]">
                    {product.name}
                  </p>

                  <section className="flex justify-between items-center">
                    <i className="text-[14px] md:text-[20px] font-semibold">
                      &#8358; {numeral(product.price).format("0,0")}
                    </i>
                    <button
                      onClick={() => handleLike(product.id)}
                      className={`absolute top-3 right-2 p-2 rounded-full ${
                        likedProducts.has(product.id)
                          ? "text-red-600  bg-white"
                          : "text-black  bg-white"
                      }`}>
                      <Favorite />
                    </button>
                    <button
                      onClick={() => handleView(product.id)}
                      className="border-2 border-white shadow-black shadow-md rounded-[8px] md:w-[50%] w-[40%] md:py-2 py-1 m-2 text-white text-center">
                      Order
                    </button>
                  </section>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
