import { useNavigate, useParams } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { FilterCategories } from "../components/FilterCategories";
import { MasonryImageList } from "../components/ImageList";
import { LuImagePlus } from "react-icons/lu";
import { useImageCard } from "../context/useContexts";
import { NotFoundImage } from "../components/NotFoundImage";
import { useState } from "react";

export const Gallery = () => {
  const { categories } = useParams<{ categories: string }>();
  const { imagesCards } = useImageCard();
  const [filteredImages, setFilteredImages] = useState(imagesCards);
  const navigate = useNavigate();

  // Convert category names from the URL to an array
  const urlCategories = categories ? categories.split("+") : [];
  console.log("urlCategories: ", urlCategories);

  const handleClick = () => {
    navigate("/image-form");
  };

  const handleFilterChange = (
    selectedCategories: string[],
    selectedCategoryNames: string[]
  ) => {
    console.log("selectedCategories: ", selectedCategories);
    console.log("selectedCategoryNames: ", selectedCategoryNames);
    console.log("imagesCards: ", imagesCards);

    if (selectedCategories.length === 0) {
      setFilteredImages(imagesCards);
    } else {
      setFilteredImages(
        imagesCards.filter((card) => {
          console.log("card.categoriesIds: ", card.categoriesIds);
          return selectedCategories.every((categoryId) =>
            card.categoriesIds.includes(categoryId)
          );
        })
      );
    }
    const newUrl = `/gallery/${selectedCategoryNames.join("+")}`;
    navigate(newUrl);
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-between mt-4 mb-2 mx-4">
        <div className="flex items-center">
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
        <MasonryImageList
          images={filteredImages}
          categoriesFilteredNames={urlCategories}
        />
      )}
    </div>
  );
};
