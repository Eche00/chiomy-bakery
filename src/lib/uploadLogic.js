import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storageF } from "./firebase";

// handling saving image to firebase storage
const storageImage = async (file) => {
  return new Promise((resolve, reject) => {
    const storage = storageF;
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
export default storageImage;

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const hello = async (file) => {
//   try {
//     const storage = storageF; // Initialize Firebase Storage
//     const fileName = new Date().getTime() + file.name; // Unique file name
//     const storageRef = ref(storage, `images/${fileName}`); // Reference to the storage path

//     // Upload the image
//     const uploadTask = await uploadBytesResumable(storageRef, file);

//     // Get the download URL after upload completes
//     const downloadURL = await getDownloadURL(uploadTask.ref);

//     console.log("Uploaded image URL:", downloadURL);
//     return downloadURL; // Return the download URL
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error; // Re-throw error for higher-level handling
//   }
// };
