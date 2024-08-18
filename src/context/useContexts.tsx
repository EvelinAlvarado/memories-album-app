import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";
import { ImageCardContext } from "./ImageCardContext";

// Custom hooks
export const useCategoryList = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryList must be used within an CategoryProvider");
  }
  return context;
};

// This hook ensures that the context is used only within a valid ImageCardProvider.
// If the context is undefined (i.e., if the hook is used outside of a provider),
// it throws an error to prevent unintended usage.
export const useImageCard = () => {
  const context = useContext(ImageCardContext);
  if (!context) {
    throw new Error("useImageCard must be used within an ImageCardProvider");
  }
  return context;
};
