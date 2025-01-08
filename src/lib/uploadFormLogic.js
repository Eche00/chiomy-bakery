import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storageF } from "./firebase";
import storageImage from "./uploadLogic";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

// Function to handle creating a property
export const handleCreateProperty = async (formData) => {
  const currentUser = auth.currentUser;

  try {
    const productDataDoc = new Date().getTime() + "-" + currentUser.uid;

    const productDataRef = doc(collection(db, "productData"), productDataDoc);

    await setDoc(productDataRef, { data: formData });
    console.log("Property Data uploaded successfully");
  } catch (error) {
    console.error("Error uploading property data:", error);
  }
};

// Function to handle image uploads
// export const handleImageUpload = async (files, formData) => {
//   try {
//     const promises = [];
//     for (let i = 0; i < files.length; i++) {
//       promises.push(storageImage(files[i]));
//     }

//     const urls = await Promise.all(promises);
//     formData.image.push(...urls);
//     return formData;
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     throw error;
//   }
// };

// export const handleImageUpload = async (files, formData) => {
//   try {
//     const promises = [];
//     for (let i = 0; i < files.length; i++) {
//       if (files[i] instanceof File) {
//         promises.push(storageImage(files[i])); // Only push valid File objects
//       } else {
//         console.error("Invalid file object:", files[i]);
//       }
//     }

//     const urls = await Promise.all(promises);
//     formData.image.push(...urls);
//     return formData;
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     throw error;
//   }
// };
// export const handleImageUpload = async (file, formData) => {
//   try {
//     // Upload the single image
//     const url = await storageImage(file); // Upload image and get the URL

//     // Add the URL to the formData object
//     formData.image = url; // Directly assign, no need for an array if it's just one image

//     return formData; // Return updated formData
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// };

export const handleImageUpload = async (file, formData) => {
  try {
    // Create a new promise to upload the image to Firebase
    const url = await new Promise((resolve, reject) => {
      const storage = storageF;
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitor the upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          // Get the download URL once the upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL); // Return the URL when upload is successful
          });
        }
      );
    });

    // Add the image URL to the form data
    formData.image = url;

    return formData; // Return the updated form data
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
