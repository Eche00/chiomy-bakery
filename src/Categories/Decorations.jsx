import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Favorite } from "@mui/icons-material";

function Decorations() {
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
          (product) => product.category === "Decorations"
        );
        setProducts(filtredData);
      },
      (error) => {
        console.error("Error fetching real-time data: ", error);
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  return <div>Decorations</div>;
}

export default Decorations;
