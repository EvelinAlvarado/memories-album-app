import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCategoryList } from "../context/useContexts";
import { LuAlertTriangle, LuFolderPlus } from "react-icons/lu";
import { ButtonCustom } from "./ButtonCustom";
import {
  FieldError,
  Merge,
  UseFormRegisterReturn,
  /* UseFormSetValue, */
} from "react-hook-form";
import { CategoryWithId } from "../types/Category";
import { useNavigate } from "react-router-dom";
/* import { FormData } from "../pages/ImageForm"; */

interface InputSelectProps {
  registerForm: UseFormRegisterReturn;
  errorForm: Merge<FieldError, (FieldError | undefined)[]> | undefined; //React-hook-form
  onReset: () => void;
  /* setValue: UseFormSetValue<FormData>; */
}

// Adjust Menu properties for better UI handling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const InputSelect = ({
  registerForm,
  errorForm,
  onReset,
}: /* setValue, */
InputSelectProps) => {
  // Access category context
  const { categories } = useCategoryList();
  // State to manage selected category IDs
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  // State to manage category names to IDs map
  const [categoryMap, setCategoryMap] = useState<Map<string, string>>(
    new Map()
  );

  // const [categorySelect, setCategorySelect] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleAddNewCategory = () => {
    navigate("/image-form/create-category");
  };

  // Reset categories selection when onReset is called
  // useEffect(() => {
  // setCategorySelect([]); // Directly reset the selected categories
  // }, [onReset]); // Triggered when onReset is called

  // Effect to set up category map and reset selection when onReset is called
  useEffect(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => map.set(category.id, category.name));
    setCategoryMap(map);
    setSelectedCategoryIds([]); // Reset the selected categories
  }, [onReset, categories]);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedCategoryIds>
  ) => {
    const {
      target: { value },
    } = event;
    const newCategorySelect =
      typeof value === "string" ? value.split(",") : value;
    setSelectedCategoryIds(newCategorySelect);
    // Map category IDs to names for display
    // const selectedNames = value.map(id => categoryMap.get(id) || "");
    // Pass the IDs to the form register
    registerForm.onChange({ target: { value: selectedCategoryIds } });
  };

  return (
    <div className="flex flex-row justify-between">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          {...registerForm}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategoryIds}
          label="Category"
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          // renderValue={(selected: string[]) => selected.join(", ")}
          renderValue={(selected) =>
            selected.map((id) => categoryMap.get(id)).join(", ")
          }
          MenuProps={MenuProps}
        >
          {categories.map((category: CategoryWithId) => (
            <MenuItem key={category.id} value={category.id}>
              {/* id or name */}
              <Checkbox
                checked={selectedCategoryIds.indexOf(category.id) > -1}
              />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
        {errorForm && (
          <p className="text-red-500 flex items-center gap-2 pl-2">
            <LuAlertTriangle className="" />
            This field is required
          </p>
        )}
      </FormControl>

      <div className="ml-4">
        <ButtonCustom
          onClickButton={handleAddNewCategory}
          nameButton={LuFolderPlus}
          textSize="text-[24px]"
          paddingY="py-3"
        />
        {/* snackbar after submitted photo */}
      </div>
    </div>
  );
};
