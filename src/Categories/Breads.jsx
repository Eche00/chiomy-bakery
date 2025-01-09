import React from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Breads() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtredData = productData.filter(
          (product) => product.category === "Bread"
        );
        setProducts(productData);
        console.log("Real-time data: ", filtredData);
        console.log("Real-time data2: ", productData);
      },
      (error) => {
        console.error("Error fetching real-time data: ", error);
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return <div>Breads</div>;
}

export default Breads;
