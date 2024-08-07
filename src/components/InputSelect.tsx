import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCategoryList } from "../context/useContexts";
import { LuFolderPlus } from "react-icons/lu";
import { ButtonCustom } from "./ButtonCustom";

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

export const InputSelect = () => {
  const { categories } = useCategoryList();

  const [categorySelect, setCategorySelect] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleChange = (event: SelectChangeEvent<typeof categorySelect>) => {
    const {
      target: { value },
    } = event;
    setCategorySelect(typeof value === "string" ? value.split(",") : value);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="flex flex-row justify-between">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categorySelect}
          label="Category"
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              <Checkbox checked={categorySelect.indexOf(category.name) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="ml-4">
        <ButtonCustom
          onClickButton={handleClick}
          nameButton={LuFolderPlus}
          textSize="text-[24px]"
          paddingY="py-3"
        />
        {/* snackbar after submitted photo */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="p-4 flex flex-col gap-2">
            <TextField label="New Category" variant="outlined" />
            <ButtonCustom nameButton="Save" />
          </div>
        </Popover>
      </div>
    </div>
  );
};
