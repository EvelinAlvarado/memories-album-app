import { LuAlertTriangle } from "react-icons/lu";
import { Box, TextField } from "@mui/material";
import { InputSelect } from "../components/InputSelect";
import { ButtonCustom } from "../components/ButtonCustom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useImageCard } from "../context/useContexts";

interface FormData {
  title: string;
  image: string;
  description: string;
  categoriesNames: string[];
}

/* const formInputs: string[] = ["Title", "Url", "Description"]; */
export const ImageForm = () => {
  // use context to create a new image
  const { createImageCard } = useImageCard();

  // Initialize React Hook Form with types
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      image: "",
      description: "",
      categoriesNames: [],
    },
  }); /* use reset() */

  // Form submission handler
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("newimagecard input data: ", data);
    createImageCard(
      data.image,
      data.description,
      data.categoriesNames,
      data.title
    );
    reset();
  };
  return (
    <Box
      component="form"
      className="h-full overflow-auto flex flex-col pt-8 px-6 gap-6"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-[24px] text-black font-semibold mb-4">
        Add New Image
      </h2>
      <div>
        <TextField
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 40,
          })}
          className="w-full"
          label="Title"
          variant="outlined"
        />
        {errors.title && (
          <p className="text-red-500 flex items-center gap-2 pl-2">
            <LuAlertTriangle className="" />
            This field is required
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("image", {
            required: true,
            minLength: 3,
            maxLength: 500,
          })}
          className="w-full"
          label="Url"
          variant="outlined"
        />
        {errors.image && (
          <p className="text-red-500 flex items-center gap-2 pl-2">
            <LuAlertTriangle className="" />
            This field is required
          </p>
        )}
      </div>
      <div>
        <TextField
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 1000,
          })}
          className="w-full"
          label="Description"
          variant="outlined"
          multiline
          rows={6}
        />
        {errors.description && (
          <p className="text-red-500 flex items-center gap-2 pl-2">
            <LuAlertTriangle className="" />
            This field is required
          </p>
        )}
      </div>

      {/* The InputSelect component for category selection */}
      <InputSelect
        registerForm={register("categoriesNames", { required: true })}
        errorForm={errors.categoriesNames}
        onReset={() => reset()}
      />

      <ButtonCustom nameButton={"Save"} buttonType="submit" />
    </Box>
  );
};
