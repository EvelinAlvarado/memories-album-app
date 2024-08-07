import { useCategoryList } from "../context/useContexts";
import { ButtonCustom } from "./ButtonCustom";

const bgColors = ["bg-peach", "bg-rose", "bg-skyBlue"];
const hoverBgColors = ["bg-peach/80", "bg-rose/80", "bg-skyBlue/80"];

export const CategoryList = () => {
  const { categories } = useCategoryList();
  return (
    <div>
      <ul className="flex gap-2 overflow-x-scroll pb-2">
        {categories.length === 0 ? (
          <p className="tex-[14px] text-left">No categories found</p>
        ) : (
          categories.map((category, index) => (
            <li key={category.id}>
              <ButtonCustom
                nameButton={category.name}
                textSize="text-[14px]"
                paddingY="py-1.5"
                textColor="text-black"
                bgColor={bgColors[index % bgColors.length]}
                hoverBgColor={hoverBgColors[index % hoverBgColors.length]}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
