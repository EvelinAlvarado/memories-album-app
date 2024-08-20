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
import { DeepMap, FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";

interface InputSelectProps {
  registerForm: UseFormRegisterReturn;
  errorForm: DeepMap<any, FieldError> | FieldError | undefined; //React-hook-form
  onReset: () => void;
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
}: InputSelectProps) => {
  // Access category context
  const { categories } = useCategoryList();

  const [categorySelect, setCategorySelect] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleAddNewCategory = () => {
    navigate("/image-form/create-category");
  };

  // Effect to reset categories selection when onReset is called
  useEffect(() => {
    if (onReset) {
      setCategorySelect([]); // Reset the selected categories
    }
  }, [onReset]); // Triggered when onReset is called

  const handleChange = (event: SelectChangeEvent<typeof categorySelect>) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(typeof value === "string" ? value.split(",") : value);
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
          value={categorySelect}
          label="Category"
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected: string[]) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.name}>
              {/* id or name */}
              <Checkbox checked={categorySelect.indexOf(category.name) > -1} />
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
