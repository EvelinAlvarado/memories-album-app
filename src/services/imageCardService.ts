import { db } from "../firebase/config";
//import { api } from "./api";
import { ImageCard, ImageCardWithId } from "../types/ImageCard";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";

// Function to fetch imagesCards data from Firestore
// This function retrieves all the documents from the "imagesCards" collection in Firestore
const fetchImagesCards = async (): Promise<ImageCardWithId[]> => {
  try {
    //Get a reference to collection "imagesCards" ("db"(config-firebase), name of collection)
    const imagesCardsRef = collection(db, "imagesCards");

    console.log(imagesCardsRef);
    // Fetch all the documents in the "imagesCards" collection
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      imagesCardsRef
    );
    console.log("Query Snapshot:", querySnapshot);
    //Extract data from documents and build an array of imagesCards
    const imagesCardsData: ImageCardWithId[] = querySnapshot.docs.map((doc) => {
      // console.log("Document Data: ", doc.data()); // Document data without ID
      // console.log("Document id:", doc.id); // Document ID
      return {
        id: doc.id,
        ...(doc.data() as ImageCard),
      };
    });
    console.log("Products Data:", imagesCardsData);

    return imagesCardsData;
  } catch (error) {
    console.error("Error loading Images Cards: ", error);
    throw new Error("Failed to get images cards.");
  }
};

// This function adds a new document to the "imagesCards" collection in Firestore
const createImageCard = async (
  newImageCard: ImageCard
): Promise<DocumentReference<DocumentData>> => {
  try {
    // Reference to the "imagesCards" collection
    const collectionRef = collection(db, "imagesCards");
    // Add the new document (newImageCard) to the collection
    const docRef = await addDoc(collectionRef, newImageCard);
    console.log("Image card written with ID: ", docRef.id);
    // Return the reference to the newly created document
    return docRef;
  } catch (error) {
    console.error("Error creating image card: ", error);
    throw new Error("Failed to create image card.");
  }
};

// This function updates a specific document in the "imagesCards" collection based on its ID
const updateImageCard = async (
  id: string,
  updateData: Partial<ImageCard> // Partial allows to update only some fields of the ImageCard
): Promise<void> => {
  try {
    // Get a reference to the document to update (by its ID)
    const docRef = doc(db, "imagesCards", id);
    // Update the document with the provided data
    await updateDoc(docRef, updateData);

    console.log("Document (Image Card) updated: ", docRef.id);
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update image card.");
  }
};

// This function removes a document from the "imagesCards" collection based on its ID
const deleteImageCard = async (id: string): Promise<void> => {
  try {
    console.log("Deleting image card by id: ", id);
    // Get a reference to the document to delete (by its ID)
    const docRef = doc(db, "imagesCards", id);
    // Delete the document
    await deleteDoc(docRef);

    console.log("Document deleted");
  } catch (error) {
    console.error("Error deleting category", error);
    throw new Error("Failed to delete image card.");
  }
};

export const imagesCardsClientServices = {
  fetchImagesCards,
  createImageCard,
  updateImageCard,
  deleteImageCard,
};
