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
import React, { useEffect, useState } from "react";
import { CategoryList } from "../components/CategoryList";

export const ImageCard = () => {
  const { categories } = useCategoryList();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();
  const { imageId, categories: categoriesPath } = useParams<{
    imageId: string;
    categories?: string;
  }>();
  const { imagesCards, deleteImageCard } = useImageCard();
  const imageCard = imagesCards.find((card) => card.id === imageId);
  // State to store a map a categories (ID --> categoryName)
  const [categoryMap, setCategoryMap] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => map.set(category.id, category.name));
    setCategoryMap(map);
  }, [categories]);

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
    // navigate(`/gallery/${imageId}/image`);
    const categoriesPathPart = categoriesPath ? `/${categoriesPath}` : "";
    navigate(`/gallery${categoriesPathPart}/${imageId}/image`);
  };
  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickEditCard = (cardId: string) => {
    console.log("click edit:", cardId);
    navigate(`/image-form/${imageCard.id}`);
  };

  const oncClickDeleteCard = async (cardId: string) => {
    console.log("Click on card to delete id: ", cardId);
    await deleteImageCard(cardId);
    console.log("Delete card id: ", cardId);
    navigate("/gallery");
  };
  console.log(imageCard.categoriesIds);
  console.log(imageCard.title);
  console.log(imageCard.id);

  // Convert categoriesIds its names
  // const categoryNames = imageCard.categoriesIds.map(
  //   (id) => categoryMap.get(id) || ""
  // );
  console.log("categorymap: ", categoryMap);
  // console.log("categorynames: ", categoryNames);

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
                <button
                  onClick={() => onClickEditCard(imageCard.id)}
                  type="button"
                  className="flex items-center gap-2"
                >
                  <LuPencilLine />
                  Edit
                </button>
              </li>
              <li className="my-2 mx-4 text-[16px]">
                <button
                  onClick={() => oncClickDeleteCard(imageCard.id)}
                  type="button"
                  className="flex items-center gap-2"
                >
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
          imageCategoryIds={imageCard.categoriesIds}
          categories={categories}
        />
      </div>
    </section>
  );
};
