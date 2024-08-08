import { v4 as uuidv4 } from "uuid";
import { api } from "./api";
import { Category } from "../types/Category";

// Function to fetch categories data from the server using async/await
const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching categories: ", error);
    throw error;
  }
};

// Function to create a new Category
const createCategory = async (name: string): Promise<Category> => {
  const id = uuidv4();
  try {
    const response = await api.post("/categories", {
      id,
      name,
    });
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category", error);
    throw error;
  }
};

// Function to update category
const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await api.put(`/categories/${category.id}`, {
      name: category.name,
    });
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating category", error);
    throw error;
  }
};

// Function to delete a category
const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    console.log("Delete category: ", id);
    const response = await api.delete(`/categories/${id}`);
    const isDeleted = response.status === 200;
    if (isDeleted) {
      console.log("Category deleted successfully");
    }
    return isDeleted;
  } catch (error) {
    console.error("Error deleting category", error);
    throw error;
  }
};

// Exported object containing client-related category services
export const categoryClientServices = {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
