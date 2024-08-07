import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { CategoryList } from "../components/CategoryList";
import { ImageCarousel } from "../components/ImageCarousel";
import { SearchInput } from "../components/SearchInput";
import { LuImagePlus } from "react-icons/lu";

export const UserHome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/image-form");
  };
  return (
    <div className="h-screen flex flex-col my-8 gap-8">
      <header className="flex flex-row justify-between px-6">
        <div className="leading-tight">
          <p className="text-[26px] text-left ">Hi, Name</p>
          <p className="text-[26px] text-left ">Think back to...</p>
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
      </header>
      <main className="h-full flex flex-col gap-8">
        <div className="px-6">
          <SearchInput />
        </div>
        <div className="px-6">
          <CategoryList />
        </div>
        {/* react slick use responsive and center mode */}
        <div className="h-full mb-10">
          <ImageCarousel />
        </div>
      </main>
    </div>
  );
};
