import { v4 as uuidv4 } from "uuid";
import { api } from "./api";
import { ImageCard } from "../types/ImageCard";

// Function to fetch imagesCards data from server
const fetchImagesCards = async (): Promise<ImageCard[]> => {
  try {
    const response = await api.get("/imagesCards");
    console.log("Fetched Image Cards:", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Images Cards: ", error);
    throw new Error("Failed to fetch image cards.");
  }
};

// Function to create a new image card
const createImageCard = async (
  image: string,
  description: string,
  categoriesNames: string[],
  title: string // Reordering the parameters so `title` is last as it’s optional (convention)
): Promise<ImageCard> => {
  const id = uuidv4();
  try {
    const response = await api.post("/imagesCards", {
      id,
      title, // Provide a default value if title is not present
      image,
      description,
      categoriesNames,
    });
    console.log("Image card created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating image card: ", error);
    throw new Error("Failed to create image card.");
  }
};

// Function to edit a image card
const updateImageCard = async (imageCard: ImageCard): Promise<ImageCard> => {
  try {
    const response = await api.put(`/imagesCards/${imageCard.id}`, imageCard);
    console.log("Image Card edited: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating image card", error);
    throw new Error("Failed to update image card.");
  }
};

// Function to delete an image card
const deleteImageCard = async (id: string): Promise<boolean> => {
  try {
    console.log("Deleting image card with id: ", id);
    const response = await api.delete(`/imagesCards/${id}`);
    const isDeleted = response.status === 200;
    if (isDeleted) {
      console.log("Image card deleted successfully");
    }
    return isDeleted;
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
