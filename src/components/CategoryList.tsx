import { ButtonCustom } from "./ButtonCustom";
import { Category } from "../types/Category";

interface CategoryListProps {
  categories: Category[];
  imageCategoryIds?: string[];
}

const bgColors = ["bg-peach", "bg-rose", "bg-skyBlue"];
const hoverBgColors = ["bg-peach/80", "bg-rose/80", "bg-skyBlue/80"];

export const CategoryList = ({
  categories,
  imageCategoryIds,
}: CategoryListProps) => {
  console.log("categories: ", categories);
  console.log("imageCategoryIds: ", imageCategoryIds);
  // If imageCategoryIds is provided, filter the categories based on it
  const filteredCategories = imageCategoryIds
    ? categories.filter((category) => imageCategoryIds.includes(category.id))
    : categories;
  console.log("filteredCategories", filteredCategories);

  return (
    <div>
      <ul className="flex gap-2 overflow-x-scroll pb-2">
        {filteredCategories.length === 0 ? (
          <p className="tex-[14px] text-left">No categories found</p>
        ) : (
          filteredCategories.map((category, index) => (
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
