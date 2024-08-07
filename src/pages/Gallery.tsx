import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { FilterCategories } from "../components/FilterCategories";
import { MasonryImageList } from "../components/ImageList";
import { LuImagePlus } from "react-icons/lu";
import { useImageCard } from "../context/useContexts";
import { NotFoundImage } from "../components/NotFoundImage";

export const Gallery = () => {
  const { imagesCards } = useImageCard();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/image-form");
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-row justify-between my-4 mx-4">
        <div className="flex items-center">
          {" "}
          {/* fixed z-1 */}
          <FilterCategories />
          <p className="ml-4 text-[24px]">All Photos</p>
        </div>
        <div className="w-20 h-full my-auto text-right">
          <ButtonCustom
            onClickButton={handleClick}
            nameButton={LuImagePlus}
            textSize="text-[24px]"
            paddingY="py-3"
          />
          {/* snackbar after submitted photo */}
        </div>
      </div>
      {imagesCards.length === 0 ? <NotFoundImage /> : <MasonryImageList />}
    </div>
  );
};
/* if there is not photo yet, write "No photo uploaded yet" and frame image */
