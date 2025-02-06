import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import Loading from "../Components/Loading";
import { ReceiptRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AllInvoice() {
  const currentUser = auth.currentUser;
  const [invoice, setInvoice] = useState([]);
  const [invoiceA, setInvoiceA] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving document:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    setLoading(false);
    // Set up a real-time listener to fetch the orderss from Firestore
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orderData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredData = orderData
        .filter((orders) => orders.userId === currentUser?.uid)
        .sort((a, b) => b.createdAt - a.createdAt);

      setInvoice(filteredData);
      setInvoiceA(orderData);
      console.log(filteredData);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  const handleView = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  if (loading) {
    return (
      <div className="py-[100px]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="sm:py-[100px]  h-screen overflow-y-scroll sm:px-0 px-2 ">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">Invoice</h2>
      {user?.email === "echeze00@gmail.com" ? (
        <section className=" sm:w-[50%] w-full mx-auto flex flex-col gap-[20px]">
          {invoiceA.length > 0 ? (
            invoiceA.map((invoice) => (
              <div className=" border-2 border-pink-600 rounded-[10px]  flex gap-[10px] p-[20px] flex-col">
                <article className="flex  items-center gap-[5px] justify-between">
                  <span className="flex items-center justify-center p-2 border-2 border-pink-600 rounded-full">
                    <ReceiptRounded />
                  </span>
                  <p>{invoice.email}</p>
                </article>
                <article className="flex items-center justify-between">
                  <p className="font-bold italic">
                    &#8358; {invoice.totalPrice.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleView(invoice.id)}
                    className=" bg-pink-600 text-white rounded-full px-5 py-2 font-bold text-[14px]">
                    View
                  </button>
                </article>
              </div>
            ))
          ) : (
            <p className=" text-center font-[400] text-[16px] pb-[20px]">
              No order has been made yet
            </p>
          )}
        </section>
      ) : (
        <section className=" sm:w-[50%] w-full mx-auto flex flex-col gap-[20px]">
          {invoice.length > 0 ? (
            invoice.map((invoice) => (
              <div className=" border-2 border-pink-600 rounded-[10px]  flex gap-[10px] p-[20px] flex-col">
                <article className="flex  items-center gap-[5px] justify-between">
                  <span className="flex items-center justify-center p-2 border-2 border-pink-600 rounded-full">
                    <ReceiptRounded />
                  </span>
                  <p>{invoice.id}</p>
                </article>
                <article className="flex items-center justify-between">
                  <p className="font-bold italic">
                    &#8358; {invoice.totalPrice.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleView(invoice.id)}
                    className=" bg-pink-600 text-white rounded-full px-5 py-2 font-bold text-[14px]">
                    View
                  </button>
                </article>
              </div>
            ))
          ) : (
            <p className=" text-center font-[400] text-[16px] pb-[20px]">
              You have order yet !{" "}
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default AllInvoice;
