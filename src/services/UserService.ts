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
import { db } from "../firebase/config";
import { User, UserWithId } from "../types/User";

// Fetch User data from Firestore
const fetchUser = async (): Promise<UserWithId[]> => {
  try {
    // Reference to 'user' collection in Firestore
    const collectionRef = collection(db, "user");
    console.log(collectionRef);
    // Fetch data
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collectionRef
    );
    console.log(querySnapshot);
    // Map over the querySnapshot to extract user data
    const userData: UserWithId[] = querySnapshot.docs.map((doc) => {
      console.log(doc.id);
      console.log(doc.data());
      return {
        id: doc.id,
        ...(doc.data() as User),
      };
    });
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("Error fetching user: ", error);
    throw new Error("Failed to fetch user");
  }
};

// Create a new user in Firestore
const createUser = async (
  newUser: User
): Promise<DocumentReference<DocumentData>> => {
  try {
    // Reference to 'user' collection
    const collectionRef = collection(db, "user");
    // Add new document
    const newDoc = await addDoc(collectionRef, newUser);
    console.log("New doc added with ID", newDoc.id);
    return newDoc;
  } catch (error) {
    console.log("Error creating user", error);
    throw new Error("Failed to create a User");
  }
};

// Update an existing user in Firestore
const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<void> => {
  try {
    // Reference to specific document by ID
    const docRef = doc(db, "user", id);
    // Update document data
    await updateDoc(docRef, updateData);
    console.log("Document (user) was updated: ", docRef.id);
  } catch (error) {
    console.log("Error updating user");
    throw new Error("Failed to update User.");
  }
};

// Delete a user from Firestore
const deleteUser = async (id: string): Promise<void> => {
  try {
    console.log("Deleting user by id: ", id);
    // Reference to document by ID
    const docRef = doc(db, "user", id);
    // Delete document from Firestore
    await deleteDoc(docRef);
    console.log("Document (user) was deleted successfully");
  } catch (error) {
    console.log("Error deleting user: ", error);
    throw new Error("Failed to delete a User.");
  }
};

// Export user service functions
export const userClientServices = {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
};
