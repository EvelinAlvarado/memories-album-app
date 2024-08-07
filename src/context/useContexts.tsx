import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";
import { ImageCardContext } from "./ImageCardContext";

// Hooks
export const useCategoryList = () => useContext(CategoryContext);
export const useImageCard = () => useContext(ImageCardContext);
