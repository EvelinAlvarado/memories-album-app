import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageCard } from "../types/ImageCard";
import { imagesCardsClientServices } from "../services/imageCardService";

/**
 * The functions in this context return `Promise<void>` because their primary role
 * is to update the context state. Components consuming the context don't need
 * the direct results of the async operations (e.g., created or fetched data);
 * they only need to trigger state updates.
 *
 * When you need to work with the result of the async operation itself (e.g., a new
 * or updated category), you can call the corresponding service function directly
 * in the component, which will return `Promise<ImageCard>` or `Promise<ImageCard[]>`.
 * This allows you to access the data and perform additional logic as needed.
 */
export interface ImageCardProps {
  imagesCards: ImageCard[];
  fetchImagesCards: () => Promise<void>;
  createImageCard: (
    image: string,
    description: string,
    categoriesNames: string[],
    title: string
  ) => Promise<void>;
  updateImageCard: (imageCard: ImageCard) => Promise<void>;
  deleteImageCard: (id: string) => Promise<void>;
}

/**
 * `ImageCardContext` is initialized with `undefined` to handle cases where the context
 * might not be available or provided by a parent component. This ensures that if a
 * component tries to access the context without a provider, TypeScript will enforce
 * checking for `undefined`, prompting you to handle the case where the context is not available.
 *
 * This approach helps prevent runtime errors and ensures that components safely use
 * the context only when it’s properly provided.
 */
export const ImageCardContext = createContext<ImageCardProps | undefined>(
  undefined
);

interface ImageCardProviderProps {
  children: ReactNode; // `children` can be any renderable content in React (e.g., elements, strings, components)
}

// `children` represents the nested content/components that this provider will wrap around
export const ImageCardProvider = ({ children }: ImageCardProviderProps) => {
  const [imagesCards, setImagesCards] = useState<ImageCard[]>([]);

  //  Fetch imagesCard from the server and update the local state.
  //  This effect runs once when the component mounts.
  const fetchImagesCards = async () => {
    try {
      const data = await imagesCardsClientServices.fetchImagesCards();
      console.log("Fetching images cards in context: ", data);
      setImagesCards(data);
    } catch (error) {
      console.error("Failed to fetch image cards in context:", error);
    }
  };

  // Create a new image card and update the local state.
  // Adds the new image card to the current list of imagesCards.
  const createImageCard = async (
    image: string,
    description: string,
    categoriesNames: string[],
    title: string
  ) => {
    try {
      const newImageCard = await imagesCardsClientServices.createImageCard(
        image,
        description,
        categoriesNames,
        title
      );
      console.log("Create image card in context: ", newImageCard);
      setImagesCards((prevImagesCars) => [...prevImagesCars, newImageCard]);
    } catch (error) {
      console.error("Failed to create image card in context: ", error);
    }
  };

  // Update an existing imageCard and update the local state.
  // Replaces the old imageCard with the updated one in the list.
  const updateImageCard = async (imageCard: ImageCard) => {
    try {
      const updateImageCard = await imagesCardsClientServices.updateImageCard(
        imageCard
      );
      setImagesCards((prevImagesCard) =>
        prevImagesCard.map((card) =>
          card.id === updateImageCard.id ? updateImageCard : card
        )
      );
      console.log(
        "Images Cards after to update imagesCard state: ",
        imagesCards
      );
    } catch (error) {
      console.error("Failed to update image card in context: ", error);
    }
  };

  // Delete a imageCard by its ID and update the local state.
  // Removes the deleted imageCard from the list.
  const deleteImageCard = async (id: string) => {
    try {
      await imagesCardsClientServices.deleteImageCard(id);
      setImagesCards((prevImagesCard) => {
        const updatedImagesCards = prevImagesCard.filter(
          (card) => card.id !== id
        );
        console.log("Images Cards after deletion:", updatedImagesCards); // Log after state update
        return updatedImagesCards;
      });
    } catch (error) {
      console.error("Failed to delete image card in context:", error);
    }
  };

  useEffect(() => {
    fetchImagesCards();
  }, []);
  return (
    <ImageCardContext.Provider
      value={{
        imagesCards,
        fetchImagesCards,
        createImageCard,
        updateImageCard,
        deleteImageCard,
      }}
    >
      {children}
    </ImageCardContext.Provider>
  );
};
