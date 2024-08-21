import React, { useEffect, useState } from "react";
import { ButtonCustom } from "../components/ButtonCustom";
import { LuMoreVertical, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { Popover } from "@mui/material";
import { useImageCard } from "../context/useContexts";
import { useParams } from "react-router-dom";
import { NotFoundImage } from "../components/NotFoundImage";
import { MasonryImageList } from "../components/ImageList";

export const CategoryAlbum = () => {
  const { imagesCards } = useImageCard();
  const [imagesAlbum, setImagesAlbum] = useState(imagesCards);
  const { categoryName } = useParams<{ categoryName: string }>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  console.log(categoryName);
  // Handle the popover for options
  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Effect to filter images based on the selected category
  useEffect(() => {
    if (categoryName) {
      const filteredImages = imagesCards.filter((card) =>
        card.categoriesNames.includes(categoryName)
      );
      console.log(filteredImages);
      setImagesAlbum(filteredImages);
    }
  }, [imagesCards, categoryName]); // Update the state when imagesCards or categoryName changes

  return (
    <section className="h-full flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-2 mx-4">
        <h2 className="text-[24px] font-semibold">{categoryName}</h2>
        <div>
          <ButtonCustom
            nameButton={LuMoreVertical}
            textSize="text-[24px]"
            textColor="text-black"
            bgColor="bg-transparent"
            hoverBgColor="bg-black/15"
            paddingX="px-0"
            onClickButton={handleClickOptions}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <ul className="">
              <li className="my-2 mx-4 text-[16px]">
                <button type="button" className="flex items-center gap-2">
                  <LuPencilLine />
                  Edit
                </button>
              </li>
              <li className="my-2 mx-4 text-[16px]">
                <button type="button" className="flex items-center gap-2">
                  <LuTrash2 />
                  Delete
                </button>
              </li>
            </ul>
          </Popover>
        </div>
      </div>
      <div className="overflow-auto">
        {imagesAlbum.length === 0 ? (
          <NotFoundImage />
        ) : (
          <MasonryImageList images={imagesAlbum} />
        )}
      </div>
    </section>
  );
};
