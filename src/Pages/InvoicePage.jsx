import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../Components/Loading";
import numeral from "numeral";
import { db } from "../lib/firebase";

function Invoice() {
  const { orderId } = useParams(); // Extract the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div>Order not found!</div>;
  }

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
          </section>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
