import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
// Assuming you're importing Firebase here

const currentUser = auth.currentUser;

const useInspectionData = () => {
  const [inspections, setInspections] = useState([]);
  const [properties, setProperties] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [userRoles, setUserRoles] = useState({
    isVendor: false,
    isClient: false,
  });

  useEffect(() => {
    // Fetch inspections in real-time
    const unsubscribeInspections = onSnapshot(
      collection(db, "inspectionData"),
      (snapshot) => {
        const inspectionData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().data,
        }));
        setInspections(inspectionData);
      }
    );

    // Fetch properties
    const fetchProperties = async () => {
      const propertyDataRef = collection(db, "propertyData");
      const querySnapshot = await getDocs(propertyDataRef);
      const propertyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().data,
      }));
      setProperties(propertyData);
    };

    fetchProperties();

    return () => unsubscribeInspections(); // Clean up listener
  }, []);

  // Matching inspections with properties linked to it
  useEffect(() => {
    const matched = inspections.map((inspection) => {
      const matchingProperty = properties.find(
        (property) => property.id === inspection.id
      );
      return { ...inspection, property: matchingProperty || null };
    });
    setMatchedData(matched);
  }, [inspections, properties]);

  // Determine roles of current user (Vendor/Client)
  useEffect(() => {
    const isVendor = matchedData.some((inspection) =>
      inspection.id.endsWith(currentUser.uid)
    );
    const isClient = matchedData.some(
      (inspection) => inspection.userReqId === currentUser.uid
    );

    setUserRoles({ isVendor, isClient });
  }, [matchedData, currentUser.uid]);

  // Handling status updates (Accept/Reject)
  const handleStatusUpdate = async (inspectionId, submittedAt, status) => {
    try {
      console.log(`${status} Inspection ID:`, inspectionId);
      const inspectionsCollectionRef = collection(db, "inspectionData");
      const q = query(
        inspectionsCollectionRef,
        where("data.id", "==", inspectionId),
        where("data.submittedAt", "==", submittedAt)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error(`No document found with inspectionId: ${inspectionId}`);
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        console.log("Document found:", docSnapshot.id);
        const docRef = docSnapshot.ref;
        await updateDoc(docRef, { "data.status": status });
        console.log(`Inspection ${inspectionId} status updated to ${status}.`);
      });
    } catch (error) {
      console.error(`Error updating inspection status to ${status}:`, error);
    }
  };

  return {
    inspections,
    properties,
    matchedData,
    userRoles,
    handleAccept: (inspectionId, submittedAt) =>
      handleStatusUpdate(inspectionId, submittedAt, "Accepted"),
    handleReject: (inspectionId, submittedAt) =>
      handleStatusUpdate(inspectionId, submittedAt, "Rejected"),
  };
};
