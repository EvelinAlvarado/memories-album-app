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
import { Category, CategoryWithId } from "../types/Category";

// Function to fetch categories data from the server using async/await
const fetchCategories = async (): Promise<CategoryWithId[]> => {
  try {
    const collectionRef = collection(db, "categories");
    console.log(collectionRef);
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collectionRef
    );
    console.log(querySnapshot);
    const categoriesData: CategoryWithId[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Category),
      };
    });
    console.log(categoriesData);
    return categoriesData;
  } catch (error) {
    console.log("Error fetching categories: ", error);
    throw new Error("Failed to fetch categories.");
  }
};

// Function to fetch categories by their IDs
const fetchCategoriesByIds = async (
  categoryIds: string[]
): Promise<CategoryWithId[]> => {
  try {
    // Create a collection reference to "categories"
    const collectionRef = collection(db, "categories");

    // Fetch all documents from the "categories" collection
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collectionRef
    );

    // Filter the categories by the provided categoryIds
    const filteredCategories: CategoryWithId[] = querySnapshot.docs
      .filter((doc) => categoryIds.includes(doc.id)) // Filter only the matching categories
      .map((doc) => {
        return {
          id: doc.id,
          ...(doc.data() as Category),
        };
      });

    console.log("Filtered categories by IDs:", filteredCategories);
    return filteredCategories;
  } catch (error) {
    console.error("Error fetching categories by IDs: ", error);
    throw new Error("Failed to fetch categories by IDs.");
  }
};

// Function to create a new Category
const createCategory = async (
  newCategory: Category
): Promise<DocumentReference<DocumentData>> => {
  try {
    const collectionRef = collection(db, "categories");
    const newDoc = await addDoc(collectionRef, newCategory);
    console.log("New doc added with ID", newDoc.id);
    return newDoc;
  } catch (error) {
    console.error("Error creating category", error);
    throw new Error("Failed to create a Category.");
  }
};

// Function to update category
const updateCategory = async (
  id: string,
  updateData: Partial<Category>
): Promise<void> => {
  try {
    const docRef = doc(db, "categories", id);
    await updateDoc(docRef, updateData);
    console.log("Document (category) was updated: ", docRef.id);
  } catch (error) {
    console.error("Error updating category", error);
    throw new Error("Failed to update category.");
  }
};

// Function to delete a category
const deleteCategory = async (id: string): Promise<void> => {
  try {
    console.log("Deleting category by id: ", id);
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log("Document (category) was deleted successfully");
    console.error("Error deleting category", error);
    throw new Error("Failed to delete a Category.");
  }
};

// Exported object containing client-related category services
export const categoryClientServices = {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategoriesByIds,
};
