import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageCard } from "../types/ImageCard";
import axios from "axios";

export interface ImageCardProps {
  imagesCards: ImageCard[];
}

export const ImageCardContext = createContext<ImageCardProps>({
  imagesCards: [],
});

interface ImageCardProviderProps {
  children: ReactNode;
}

export const ImageCardProvider = ({ children }: ImageCardProviderProps) => {
  const [imagesCards, setImagesCards] = useState<ImageCard[]>([]);
  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${url}/imagesCards`);
        console.log(response.data);
        setImagesCards(response.data);
      } catch (error) {
        console.log("Error fetching Images Cards Data: ", error);
      }
    };
    fetchCards();
  }, []);
  return (
    <ImageCardContext.Provider value={{ imagesCards }}>
      {children}
    </ImageCardContext.Provider>
  );
};
