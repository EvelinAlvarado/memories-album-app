import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageCard, ImageCardWithId } from "../types/ImageCard";
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
  imagesCards: ImageCardWithId[];
  fetchImagesCards: () => Promise<ImageCardWithId[]>;
  createImageCard: (newImageCard: ImageCard) => Promise<ImageCardWithId>;
  updateImageCard: (
    imageCardId: string,
    updateData: Partial<ImageCard>
  ) => Promise<void>;
  deleteImageCard: (imageCardId: string) => Promise<void>;
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
  const [imagesCards, setImagesCards] = useState<ImageCardWithId[]>([]);

  //  Fetch imagesCard from the server and update the local state.
  //  This effect runs once when the component mounts.
  const fetchImagesCards = async () => {
    try {
      const data = await imagesCardsClientServices.fetchImagesCards();
      console.log("Fetching images cards in context: ", data);
      setImagesCards(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch image cards in context:", error);
      throw error;
    }
  };

  // Create a new image card and update the local state.
  // Adds the new image card to the current list of imagesCards.
  const createImageCard = async (imageCard: ImageCard) => {
    try {
      const newImageCardDoc = await imagesCardsClientServices.createImageCard(
        imageCard
      );
      const newImageCard: ImageCardWithId = {
        ...imageCard,
        id: newImageCardDoc.id,
      };
      console.log("Created a new image card in Context: ", newImageCard);
      setImagesCards((prevImagesCars) => [...prevImagesCars, newImageCard]);
      return newImageCard;
    } catch (error) {
      console.error("Failed to create image card in context: ", error);
      throw error;
    }
  };

  // Update an existing imageCard and update the local state.
  // Replaces the old imageCard with the updated one in the list.
  const updateImageCard = async (
    imageCardId: string,
    updateData: Partial<ImageCard>
  ) => {
    try {
      await imagesCardsClientServices.updateImageCard(imageCardId, updateData);
      setImagesCards((prevImagesCard) =>
        prevImagesCard.map((card) =>
          card.id === imageCardId ? { ...card, ...updateData } : card
        )
      );
      console.log(
        "Images Cards after to update imagesCard state: ",
        imageCardId,
        updateData
      );
    } catch (error) {
      console.error("Failed to update image card in context: ", error);
    }
  };

  // Delete a imageCard by its ID and update the local state.
  // Removes the deleted imageCard from the list.
  const deleteImageCard = async (imageCardId: string) => {
    try {
      await imagesCardsClientServices.deleteImageCard(imageCardId);
      setImagesCards((prevImagesCard) =>
        prevImagesCard.filter((card) => card.id !== imageCardId)
      );
      console.log("Images Cards after deletion:", imagesCards); // Log after state update
      //return updatedImagesCards;
    } catch (error) {
      console.error("Failed to delete image card in context:", error);
    }
  };

  useEffect(() => {
    const loadersImagesCards = async () => {
      try {
        await fetchImagesCards();
      } catch (error) {
        console.log("Failed to load images cards", error);
      }
    };
    loadersImagesCards();
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
