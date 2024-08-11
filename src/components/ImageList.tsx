import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useImageCard } from "../context/useContexts";

export const MasonryImageList = () => {
  const { imagesCards } = useImageCard();
  const reversedImages = [...imagesCards].reverse();
  const navigate = useNavigate();

  const handleImageClick = (id: string) => {
    console.log("image was clicked", id);
    navigate(`/gallery/${id}`);
  };
  return (
    <Box
      sx={{ width: "100%", overflowY: "scroll" }}
      className="h-[calc(100vh-130px)]"
    >
      <ImageList variant="masonry" cols={2} gap={4} className="relative">
        {reversedImages.map((item) => (
          <ImageListItem
            key={item.id}
            className="transition-transform duration-300  active:scale-95"
            component="li" // ensure the component show it like a <li>
            onClick={() => handleImageClick(item.id)}
          >
            <img
              className=""
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <div className="absolute bg-black inset-0 opacity-0 transition-opacity duration-300 hover:opacity-40 cursor-pointer"></div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
