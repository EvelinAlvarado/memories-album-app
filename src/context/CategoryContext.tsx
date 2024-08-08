import { createContext, ReactNode, useEffect, useState } from "react";
import { Category } from "../types/Category";
import axios from "axios";

export interface CategoryContextProps {
  categories: Category[];
}

export const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
});

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/categories`);
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching Categories data: ", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
