import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function Checkout() {
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({});
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(1000);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userDataRef = collection(db, "users");
    getDocs(userDataRef)
      .then((querySnap) => {
        const userData = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // // filtering the db to check for the id which matches the propertyId
        const filteredUser = userData.find(
          (prop) => prop.id === currentUser?.uid
        );

        setUser(filteredUser);
      })
      .catch((error) => {
        console.error("Error retrieving document:", error);
      });
  }, []);

  return (
    <div className="py-[20px] flex flex-col gap-[20px] pb-[100px]">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">
        Check Out
      </h2>
      <div className="md:w-[70%] w-full mx-auto flex md:flex-column sm:flex-row flex-col gap-[20px] md:gap-[50px] ">
        <section className=" flex flex-col  w-full gap-[10px] px-[10px] ">
          {/* input 1 -2 */}
          <div className=" flex items-center gap-[10px]">
            <input
              type="text"
              value={user?.name}
              className="text-white border-2 border-pink-600 bg-transparent rounded-full"
            />
            <input type="text" />
          </div>
          {/* input 3 - 4 */}

          <div className=" w-full flex flex-col gap-[10px]">
            <input type="text" />
            <input type="text" />
          </div>
          {/* input 5 - 6 */}

          <div className=" flex items-center gap-[10px]">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          {/* input 7 */}

          <div className=" w-full">
            <input type="text" placeholder="Mobile Number" />
          </div>
          <button
            className="bg-pink-600 py-[15px] text-[16px] font-bold text-white rounded-full my-[10px] w-full text-center"
            type="submit">
            Check out
          </button>
        </section>

        {/* second checkout section  */}
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
      </div>
    </div>
  );
}

export default Checkout;
