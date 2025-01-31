import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ArrowCircleRightOutlined,
  ArrowForward,
  Favorite,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";
import { auth, db } from "../lib/firebase";
import Loading from "../Components/Loading";

function Product() {
  const currentUser = auth.currentUser;
  const [products, setProducts] = useState([]);
  const [cake, setCake] = useState([]);
  const [bread, setBread] = useState([]);
  const [pastries, setPastries] = useState([]);
  const [decoratons, setDecoratons] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [likedProducts, setLikedProducts] = useState(new Set()); // Track liked products by ID
  const navigate = useNavigate();

  useEffect(() => {
    // Set up a real-time listener to fetch the products from Firestore
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // all data filtered
      const filteredData = productData
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);
      // cakes
      const cakeFiltered = productData
        .filter((product) => product.category === "Cake")
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);
      // breads
      const breadFiltred = productData
        .filter((product) => product.category === "Bread")
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);
      // pastries
      const pastriesFiltred = productData
        .filter((product) => product.category === "Pastries")
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);

      // decorations
      const decorationsFiltred = productData
        .filter((product) => product.category === "Decorations")
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);
      // gifts
      const giftsFiltred = productData
        .filter((product) => product.category === "Gift Packs")
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 4);

      setProducts(filteredData);
      setCake(cakeFiltered);
      setBread(breadFiltred);
      setPastries(pastriesFiltred);
      setDecoratons(decorationsFiltred);
      setGifts(giftsFiltred);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

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

  const handleView = (productId) => {
    navigate(`/productcard/${productId}`);
  };

  return (
    <div className="flex flex-col pt-[30px] overflow-hidden pb-[100px]">
      <h1 className="font-extrabold text-[20px] text-center">Shop</h1>

      <div className="overflow-scroll w-full ">
        <div className="flex items-center gap-[10px] overflow-scroll w-fit ">
          {products.length > 0 &&
            products.map((product) => (
              <div className="w-fit pt-5 backdrop-blur-sm" key={product.id}>
                <img
                  className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] object-cover rounded-full"
                  src={product.imageUrl}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>

      <div>
        {products.length > 0 ? (
          <div className=" flex flex-col gap-[20px]">
            {/* cakes section  */}
            <section className=" w-full">
              <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
                {cake.map((product) => (
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
                ))}
              </div>
              {cake.length > 0 && (
                <Link
                  to="/cake"
                  className=" text-center underline  text-[12px] font-bold flex items-center justify-center w-full pt-[10px]">
                  see more <ArrowForward fontSize="small" />
                </Link>
              )}
            </section>

            {/* bread section  */}
            <section className=" w-full">
              <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
                {bread.map((product) => (
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
                ))}
              </div>
              {bread.length > 0 && (
                <Link
                  to="/bread"
                  className=" text-center underline  text-[12px] font-bold flex items-center justify-center w-full pt-[10px]">
                  see more <ArrowForward fontSize="small" />
                </Link>
              )}
            </section>
            {/* pastries section  */}
            <section className=" w-full">
              <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
                {pastries.map((product) => (
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
                ))}
              </div>
              {pastries.length > 0 && (
                <Link
                  to="/pastries"
                  className=" text-center underline  text-[12px] font-bold flex items-center justify-center w-full pt-[10px]">
                  see more <ArrowForward fontSize="small" />
                </Link>
              )}
            </section>

            {/* decoration section  */}
            <section className=" w-full">
              <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
                {decoratons.map((product) => (
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
                ))}
              </div>
              {decoratons.length > 0 && (
                <Link
                  to="/decoration"
                  className=" text-center underline  text-[12px] font-bold flex items-center justify-center w-full pt-[10px]">
                  see more <ArrowForward fontSize="small" />
                </Link>
              )}
            </section>

            {/* gifts section  */}
            <section className=" w-full">
              <div className="grid md:flex md:flex-wrap grid-cols-2 gap-[20px] pt-[30px]">
                {gifts.map((product) => (
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
                ))}
              </div>
              {gifts.length > 0 && (
                <Link
                  to="/gift"
                  className=" text-center underline  text-[12px] font-bold flex items-center justify-center w-full pt-[10px]">
                  see more <ArrowForward fontSize="small" />
                </Link>
              )}
            </section>
          </div>
        ) : (
          <div className=" flex items-center justify-center w-full mx-auto h-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
