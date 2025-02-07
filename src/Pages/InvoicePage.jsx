import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Loading from "../Components/Loading";
import numeral from "numeral";
import { auth, db } from "../lib/firebase";

function Invoice() {
  const currentUser = auth.currentUser;
  const { orderId } = useParams(); // Extract the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [user, setUser] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
      })
      .catch((error) => {
        console.error("Error retrieving document:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    // Fetch the order data from Firestore
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId); // Get the specific order from Firestore
        const orderDoc = await getDoc(orderRef);

        if (orderDoc.exists()) {
          setOrder(orderDoc.data()); // Set the order data
        } else {
          console.error("No such order!");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchOrder();
  }, [orderId]); // Run this whenever the orderId changes

  // If still loading, show the loading spinner
  if (loading) {
    return (
      <div className="text-center font-[400] text-[16px] py-[20px]">
        <Loading />
      </div>
    );
  }

  // If order is not found
  if (!order) {
    return <div className="my-20">Order not found!</div>;
  }

  const completeOrder = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const link = "https://chiomy-bakery.vercel.app" + pathname;
    console.log(link);

    try {
      let number = "+2347041729402";
      let url =
        "https://wa.me/" + number + "?text=" + "Order: " + " " + link + "%0a";
      window.open(url, "_blank").focus();
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
    }
  };
  const deleteOrder = async () => {
    setButtonLoading(true);
    try {
      const orderRef = doc(db, "orders", orderId); // Get the specific order from Firestore
      await deleteDoc(orderRef); // Delete the order from Firestore
      navigate("/AllInvoice");
      console.log("Order deleted successfully!");
      setButtonLoading(false);
      setOrder(null); // Optionally clear the order from state
    } catch (error) {
      console.error("Error deleting order:", error);
      setButtonLoading(false);
    }
  };

  const loadingSvg = (
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );
  return (
    <div className="py-[20px] px-[20px] mb-[100px]">
      <h2 className=" text-center font-bold text-[18px] pb-[20px]">Invoice</h2>

      {/* Customer Info */}
      <div className="md:w-[70%] w-full mx-auto flex md:flex-column sm:flex-row flex-col gap-[20px] md:gap-[50px]  justify-between">
        <section className="flex flex-col gap-[10px] w-full sm:border-2 border-pink-600 rounded-[10px] p-[20px] flex-1 h-fit">
          <h3 className=" font-extrabold text-[16px]">
            Customer Information -
          </h3>
          <p>
            <b>Invoice:</b> #{orderId}
          </p>
          <p>
            <b>Name:</b> {order.name}
          </p>
          <p>
            <b>Email:</b> {order.email}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
          <p>
            <b>City:</b> {order.city}
          </p>
          <p>
            <b>State:</b> {order.state}
          </p>
          <p>
            <b>Mobile:</b> {order.mobile}
          </p>
        </section>

        <div className="border-2 border-pink-600 rounded-[10px] p-[20px] flex sm:w-[30%] w-full flex-col gap-[20px] h-fit">
          {/* Order Details */}
          <section className="mb-[30px] ">
            <h3 className="font-[500] text-[16px] pb-[10px]">Order Details</h3>
            <div className="flex flex-col gap-[10px]">
              {order.products.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    {/* Product Image */}
                    <img
                      src={product.imageUrl} // Assuming your products have an image URL
                      alt={product.name}
                      className="w-[50px] h-[50px] object-cover rounded"
                    />
                    <p>{product.name}</p>
                  </div>

                  {/* Quantity and Total Price */}
                  <div className="flex items-center gap-[10px]">
                    <p>{product.quantity}</p>
                    <p>
                      &#8358;{" "}
                      <i>
                        {(product.price * product.quantity).toLocaleString()}
                      </i>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <section className="border-t-2 pt-[10px]">
            <h3 className="font-[500] text-[16px] pb-[10px]">Order Summary</h3>
            <p>Sub Total: &#8358; {order.subTotalPrice.toLocaleString()}</p>
            <p>Delivery Fee: &#8358; {order.deliveryPrice.toLocaleString()}</p>
            <p className="font-[600]">
              Total: &#8358; {order.totalPrice.toLocaleString()}
            </p>
            {user?.email === "echeze00@gmail.com" ? (
              <button
                className="bg-red-600 py-[10px] text-[16px] font-bold text-white rounded-full my-[10px] w-full text-center"
                onClick={() => deleteOrder(order.id)}
                type="submit"
                disabled={buttonLoading}>
                {!buttonLoading ? "  Delete Order" : loadingSvg}
              </button>
            ) : (
              <button
                className="bg-pink-600 py-[10px] text-[16px] font-bold text-white rounded-full my-[10px] w-full text-center"
                onClick={completeOrder}
                type="submit"
                disabled={buttonLoading}>
                {!buttonLoading ? "Complete Order" : loadingSvg}
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
