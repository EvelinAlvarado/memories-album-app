import { Box, TextField } from "@mui/material";
import { InputSelect } from "./InputSelect";
import { ButtonCustom } from "./ButtonCustom";

/* const formInputs: string[] = ["Title", "Url", "Description"]; */
export const ImageForm = () => {
  return (
    <Box
      component="form"
      className="h-screen flex flex-col my-8 mx-4 gap-8"
      noValidate
      autoComplete="off"
    >
      <TextField label="Title" variant="outlined" />
      <TextField label="Url" variant="outlined" />
      <TextField label="Description" variant="outlined" multiline rows={6} />
      {/* {formInputs.map((input, index) => (
        <TextField key={input[index]} label={input} variant="outlined" />
      ))} */}
      <InputSelect />
      {/* map is clever, but i must use validation form */}
      <ButtonCustom nameButton={"Add Image"} buttonType="submit" />
    </Box>
  );
};
