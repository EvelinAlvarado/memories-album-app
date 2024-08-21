import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { FilterCategories } from "../components/FilterCategories";
import { MasonryImageList } from "../components/ImageList";
import { LuImagePlus } from "react-icons/lu";
import { useImageCard } from "../context/useContexts";
import { NotFoundImage } from "../components/NotFoundImage";
import { useState } from "react";

export const Gallery = () => {
  const { imagesCards } = useImageCard();
  const [filteredImages, setFilteredImages] = useState(imagesCards);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/image-form");
  };

  const handleFilterChange = (selectedCategories: string[]) => {
    console.log("selectedCategories: ", selectedCategories);
    console.log("imagesCards: ", imagesCards);
    if (selectedCategories.length === 0) {
      setFilteredImages(imagesCards);
    } else {
      setFilteredImages(
        imagesCards.filter((card) => {
          console.log("card.categoriesNames: ", card.categoriesNames);
          return selectedCategories.every((category) =>
            card.categoriesNames.includes(category)
          );
        })
      );
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-between mt-4 mb-2 mx-4">
        <div className="flex items-center">
          {" "}
          {/* fixed z-1 */}
          <FilterCategories onFilterChange={handleFilterChange} />
          <p className="ml-4 text-[24px]">All Photos</p>
        </div>
        <div className="w-20 my-auto text-right overflow-auto">
          <ButtonCustom
            onClickButton={handleClick}
            nameButton={LuImagePlus}
            textSize="text-[24px]"
            paddingY="py-3"
          />
          {/* snackbar after submitted photo */}
        </div>
      </div>
      {filteredImages.length === 0 ? (
        <NotFoundImage />
      ) : (
        <MasonryImageList images={filteredImages} />
      )}
    </div>
  );
};
/* if there is not photo yet, write "No photo uploaded yet" and frame image */
/* use useparams to link http://localhost:5173/gallery+family */
