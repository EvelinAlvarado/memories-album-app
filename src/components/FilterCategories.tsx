import { LuSettings2 } from "react-icons/lu";
import { Checkbox, FormControlLabel, FormGroup, Popover } from "@mui/material";
import { useState } from "react";
import { useCategoryList } from "../context/useContexts";

interface FilterCategoriesProps {
  onFilterChange: (selectedCategories: string[]) => void;
}

export const FilterCategories = ({ onFilterChange }: FilterCategoriesProps) => {
  const { categories } = useCategoryList();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(categoryId);
      const updatedSelected = isSelected
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];

      onFilterChange(updatedSelected); // Pass the selected categories up to the parent component
      return updatedSelected;
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <button
        className="p-3 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300"
        aria-describedby={id}
        onClick={handleClick}
      >
        <LuSettings2 className="text-[24px]" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-4">
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </div>
      </Popover>
    </>
  );
};
