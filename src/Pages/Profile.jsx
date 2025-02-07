import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteUser, signOut } from "firebase/auth";
import { Logout, Warning } from "@mui/icons-material";
import { ProfileImg } from "../assets";
import { Button, Modal } from "flowbite-react";

function Profile() {
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
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

  const handleSignOut = (e) => {
    e.preventDefault();
    try {
      signOut(auth).then(() => {
        console.log("user logged out");
        navigate("/signin");
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid); // Assuming "users" collection is where user data is stored
      await deleteDoc(userRef);
      console.log("User data deleted from Firestore.");
      await deleteUser(currentUser);
      navigate("/signin");
    } catch (error) {
      console.log(error, "");
    }
  };

  return (
    <div className=" py-[100px] ">
      <h2 className=" text-center font-[400] text-[18px] pb-[20px]">Profile</h2>
      <form className=" flex flex-col gap-5 md:w-[40%] w-[80%] mx-auto ">
        <img
          className=" rounded-full cursor-pointer self-center w-[120px] h-[120px] object-cover"
          src={ProfileImg}
          alt="profile"
        />

        <input
          id="username"
          type="text"
          value={user?.name}
          placeholder="username"
          className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
        />
        <input
          id="email"
          type="email"
          value={user?.email}
          placeholder="email"
          className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
        />

        <div className="flex items-center justify-between">
          <button
            className="  md:py-[15px] py-[10px] text-[14px] font-bold text-white rounded-full my-[10px]   cursor-pointer"
            type="button"
            onClick={() => setShowModal(true)}>
            Delete Account
          </button>
          <button
            className=" py-[5px] px-[10px] border-2 opacity-90 rounded-[5px] max-w-[70%] text-pink-600 border-pink-600 "
            onClick={handleSignOut}>
            <Logout fontSize="small" />
          </button>{" "}
        </div>
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md">
        <Modal.Header />
        <Modal.Body>
          <div className=" text-center text-gray-400 dark:text-gray-200 my-4 mx-auto">
            <Warning fontSize="large" />
            <h3 className=" font-semibold text-gray-500 dark:text-gray-400 text-lg text-center my-4">
              Are you sure you want to delete your account ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, i'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
