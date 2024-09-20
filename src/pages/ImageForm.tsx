import { LuAlertTriangle } from "react-icons/lu";
import { Box, TextField } from "@mui/material";
import { InputSelect } from "../components/InputSelect";
import { ButtonCustom } from "../components/ButtonCustom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useImageCard } from "../context/useContexts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export interface FormData {
  title: string;
  image: string;
  description: string;
  categoriesIds: string[];
}

export const ImageForm = () => {
  // use context to create a new image
  const { createImageCard, updateImageCard, imagesCards } = useImageCard();
  const navigate = useNavigate();
  const { imageId } = useParams<{ imageId?: string }>();

  // Initialize React Hook Form with types
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      image: "",
      description: "",
      categoriesIds: [],
    },
  });

  useEffect(() => {
    if (imageId) {
      const imageCard = imagesCards.find((card) => card.id === imageId);
      if (imageCard) {
        setValue("title", imageCard.title);
        setValue("image", imageCard.image);
        setValue("description", imageCard.description);
        setValue("categoriesIds", imageCard.categoriesIds);
      }
    }
  }, [imageId, imagesCards, setValue]);

  // Form submission handler
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("imageCard: ", data);
    if (imageId) {
      // If imageId exists, update the image card
      // const updatedCard = {
      //   ...data,
      //   id: imageId,
      // };
      updateImageCard(imageId, data).then(() => {
        navigate(`/gallery/${imageId}`);
        console.log("updated imageCard: ", imageId, data);
      });
    } else {
      // Otherwise, create a new image card
      createImageCard(data).then(() => {
        navigate("/gallery");
      });
    }
    reset();
  };
  return (
    <Box
      component="form"
      className="h-full overflow-auto pt-8 px-6 gap-6 w-full md:flex md:justify-center md:items-center"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6 md:w-1/2 xl:w-[650px] md:text-center">
        <h2 className="text-[24px] text-black font-semibold mb-4">
          {imageId ? "Edit Image" : "Add New Image"}
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
          registerForm={register("categoriesIds", { required: true })}
          errorForm={errors.categoriesIds}
          onReset={() => reset()}
        />

        <ButtonCustom nameButton={"Save"} buttonType="submit" />
      </div>
    </Box>
  );
};
