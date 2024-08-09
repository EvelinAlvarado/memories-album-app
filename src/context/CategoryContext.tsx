import { createContext, ReactNode, useEffect, useState } from "react";
import { Category } from "../types/Category";
import { categoryClientServices } from "../services/categoryService";

/**
 * The functions in this context return `Promise<void>` because their primary role
 * is to update the context state. Components consuming the context don't need
 * the direct results of the async operations (e.g., created or fetched data);
 * they only need to trigger state updates.
 *
 * When you need to work with the result of the async operation itself (e.g., a new
 * or updated category), you can call the corresponding service function directly
 * in the component, which will return `Promise<Category>` or `Promise<Category[]>`.
 * This allows you to access the data and perform additional logic as needed.
 */

export interface CategoryContextProps {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}
/**
 * `CategoryContext` is initialized with `undefined` to handle cases where the context
 * might not be available or provided by a parent component. This ensures that if a
 * component tries to access the context without a provider, TypeScript will enforce
 * checking for `undefined`, prompting you to handle the case where the context is not available.
 *
 * This approach helps prevent runtime errors and ensures that components safely use
 * the context only when it’s properly provided.
 */
export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode; // `children` can be any renderable content in React (e.g., elements, strings, components)
}

// `children` represents the nested content/components that this provider will wrap around
export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  //  Fetch categories from the server and update the local state.
  //  This effect runs once when the component mounts.
  const fetchCategories = async () => {
    try {
      const data = await categoryClientServices.fetchCategories();
      console.log("Fetching categories in context: ", data);
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories in context:", error);
    }
  };

  // Create a new category and update the local state.
  // Adds the new category to the current list of categories.
  const createCategory = async (name: string) => {
    try {
      const newCategory = await categoryClientServices.createCategory(name);
      console.log("Create category in context: ", newCategory);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error("Failed to create category in context: ", error);
    }
  };

  // Update an existing category and update the local state.
  // Replaces the old category with the updated one in the list.
  const updateCategory = async (category: Category) => {
    try {
      const updateCategory = await categoryClientServices.updateCategory(
        category
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updateCategory.id ? updateCategory : cat
        )
      );
      console.log("Categories after to updateCategory function: ", categories);
    } catch (error) {
      console.error("Failed to update category in context: ", error);
    }
  };

  // Delete a category by its ID and update the local state.
  // Removes the deleted category from the list.
  const deleteCategory = async (id: string) => {
    try {
      await categoryClientServices.deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
      console.log(
        "Categories after delete a Category in context: ",
        categories
      );
    } catch (error) {
      console.error("Failed to delete category in context:", error);
    }
  };

  // useEffect hook to fetch categories when the component mounts.
  // The empty dependency array `[]` ensures this effect runs only once.
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
