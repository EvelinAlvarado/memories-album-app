import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// import { useImageCard } from "../context/useContexts";
import { ImageCardWithId } from "../types/ImageCard";
import { useMediaQuery } from "@mui/material";

interface MasonryImageListProps {
  images: ImageCardWithId[];
  categoriesFilteredNames?: string[];
}

export const MasonryImageList = ({
  images,
  categoriesFilteredNames = [],
}: MasonryImageListProps) => {
  const reversedImages = [...images].reverse();
  const navigate = useNavigate();

  // Material UI Hook to detect screen size
  const isMdScreen = useMediaQuery("(min-width: 768px)");
  const isLgScreen = useMediaQuery("(min-width: 1024px)");
  const is2xlScreen = useMediaQuery("(min-width: 1536px)");

  let cols = 2;
  if (isMdScreen && !isLgScreen) {
    cols = 4;
  } else if (isLgScreen && !is2xlScreen) {
    cols = 5;
  } else if (is2xlScreen) {
    cols = 10;
  }

  const handleImageClick = (id: string) => {
    console.log("image was clicked", id);

    const categoriesPath =
      categoriesFilteredNames.length > 0
        ? `${categoriesFilteredNames.join("+")}`
        : "photo";
    navigate(`/gallery/${categoriesPath}/${id}`);
  };
  return (
    <Box
      sx={{ width: "100%", overflowY: "scroll" }}
      className="h-[calc(100vh-130px)]"
    >
      <ImageList variant="masonry" cols={cols} gap={4} className="relative">
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
