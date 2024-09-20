import React, { useEffect, useState } from "react";
import { ButtonCustom } from "../components/ButtonCustom";
import {
  LuAlertTriangle,
  LuCheckCircle,
  LuMoreVertical,
  LuPencilLine,
  LuTrash2,
} from "react-icons/lu";
import { Popover } from "@mui/material";
import { useCategoryList, useImageCard } from "../context/useContexts";
import { useNavigate, useParams } from "react-router-dom";
import { NotFoundImage } from "../components/NotFoundImage";
import { MasonryImageList } from "../components/ImageList";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../types/Category";

export const CategoryAlbum = () => {
  const { imagesCards } = useImageCard();
  const { categories, updateCategory, deleteCategory } = useCategoryList();
  const [imagesAlbum, setImagesAlbum] = useState(imagesCards);
  const { categoryName, categoryId = "" } = useParams<{
    categoryName: string;
    categoryId: string;
  }>();
  const [isEditingCategoryName, setIsEditingCategoryName] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();

  // Find the category name using the categoryId
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  const categoryDisplayName: string = selectedCategory
    ? selectedCategory.name
    : "Unknown Category";

  console.log("selectedCategory: ", selectedCategory);
  console.log("categoryId: ", categoryId);
  console.log("categoryName: ", categoryName);

  // Handle the popover for options
  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //Editing and updating Category name
  console.log(isEditingCategoryName);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: { name: categoryDisplayName },
  });

  // Effect to filter images based on the selected category
  useEffect(() => {
    if (categoryId) {
      const filteredImages = imagesCards.filter((card) =>
        card.categoriesIds.includes(categoryId)
      );
      console.log(filteredImages);
      setImagesAlbum(filteredImages);

      if (isEditingCategoryName && selectedCategory) {
        setValue("name", selectedCategory.name);
      }
    }
  }, [
    imagesCards,
    categoryId,
    isEditingCategoryName,
    selectedCategory,
    setValue,
  ]); // Update the state when imagesCards or categoryName changes

  const onSubmit: SubmitHandler<Category> = async (data) => {
    console.log("Name changes to: ", data);
    if (categoryId) {
      await updateCategory(categoryId, { name: data.name });
      setIsEditingCategoryName(false);
    }
  };

  const oncClickDeleteCategory = async (categoryId: string) => {
    console.log("Click on category to delete id: ", categoryId);
    if (!categoryId) {
      console.error("Category ID is undefined");
      return;
    }
    await deleteCategory(categoryId);
    console.log("Delete category id: ", categoryId);
    navigate("/user-home/:userId");
  };

  return (
    <section className="h-full flex flex-col">
      <div className="flex justify-between items-center mt-4 mb-2 mx-4">
        {isEditingCategoryName ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <div>
              <input
                className="border-solid border-black border-2 rounded-md px-3.5 py-2.5"
                type="text"
                placeholder="Category Name"
                {...register("name", {
                  required: true,
                  minLength: 1,
                  maxLength: 20,
                })}
              />
              {errors.name && (
                <span className="text-red-500 flex items-center gap-2 pl-2">
                  <LuAlertTriangle className="" />
                  This field is required
                </span>
              )}
            </div>
            {/* Submit button to save the name */}
            <ButtonCustom
              nameButton={LuCheckCircle}
              paddingX="px-1"
              bgColor="bg-transparent"
              textColor="text-gray-500"
              buttonType="submit"
            />
          </form>
        ) : (
          <h2 className="text-[24px] font-semibold">{categoryDisplayName}</h2>
        )}
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
                  onClick={() => setIsEditingCategoryName(true)}
                  type="button"
                  className="flex items-center gap-2"
                >
                  <LuPencilLine />
                  Edit Album
                </button>
              </li>
              <li className="my-2 mx-4 text-[16px]">
                <button
                  onClick={() => oncClickDeleteCategory(categoryId)}
                  type="button"
                  className="flex items-center gap-2"
                >
                  <LuTrash2 />
                  Delete Album
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
