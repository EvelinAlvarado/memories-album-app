import { useNavigate, useParams } from "react-router-dom";
import { LuX } from "react-icons/lu";
import { useImageCard } from "../context/useContexts";
import { ButtonCustom } from "../components/ButtonCustom";

export const Image = () => {
  const { imageId, categories } = useParams<{
    imageId: string;
    categories: string;
  }>();
  const { imagesCards } = useImageCard();
  const navigate = useNavigate();
  const imageCard = imagesCards.find((card) => card.id === imageId);

  if (!imageCard) {
    return <div>Image not found</div>;
  }

  const handleClose = () => {
    // navigate(`/gallery/${imageId}`);
    const categoriesPath = categories ? `/${categories}` : "";
    navigate(`/gallery${categoriesPath}/${imageId}`);
  };
  return (
    <div className="h-full flex justify-center items-center py-4 relative">
      <div className="absolute top-6 right-3">
        <ButtonCustom
          nameButton={LuX}
          textSize="text-[22px]"
          textColor="text-black"
          onClickButton={handleClose}
          bgColor="bg-transparent"
          hoverBgColor="bg-black/15"
        />
      </div>
      <img src={imageCard.image} alt={imageCard.title} />
    </div>
  );
};
