import { useNavigate, useParams } from "react-router-dom";
import {
  LuEye,
  LuMoreVertical,
  LuPencilLine,
  LuTrash2,
  LuImageOff,
} from "react-icons/lu";
import { useCategoryList, useImageCard } from "../context/useContexts";
import { ButtonCustom } from "../components/ButtonCustom";
import { Popover } from "@mui/material";
import React from "react";
import { CategoryList } from "../components/CategoryList";

export const ImageCard = () => {
  const { categories } = useCategoryList();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();
  const { imageId } = useParams<{ imageId: string }>();
  const { imagesCards } = useImageCard();
  const imageCard = imagesCards.find((card) => card.id === imageId);

  if (!imageCard) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-5">
        <LuImageOff className="text-[100px]" />
        <p>Image not found</p>
      </div>
    );
  }

  const handleClickShowImage = () => {
    console.log("click");
    navigate(`/gallery/${imageId}/image`);
  };
  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  /* console.log(imageCard.categoriesNames);
  console.log(imageCard.title);
  console.log(imageCard.id); */
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <section className="h-full overflow-auto flex flex-col pt-8 px-6 gap-6">
      {/* <button>delete?</button> */}
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] font-semibold">{imageCard.title}</h2>
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
      <div className="relative">
        <img
          className="rounded-lg h-[calc(100vh-400px)] object-cover w-full"
          src={imageCard.image}
          alt={imageCard.title}
        />
        <div className="absolute top-0 right-0">
          <ButtonCustom
            nameButton={LuEye}
            textSize="text-[20px]"
            onClickButton={handleClickShowImage}
            bgColor="bg-transparent"
            hoverBgColor="bg-black/15"
          />
        </div>
      </div>
      <h3 className="text-[16px] font-semibold">Description</h3>
      <p className="text-[12px]">{imageCard.description}</p>
      <div>
        <CategoryList
          imageCategoryNames={imageCard.categoriesNames}
          categories={categories}
        />
      </div>
    </section>
  );
};
