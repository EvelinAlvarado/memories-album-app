import { SubmitHandler, useForm } from "react-hook-form";
import { useCategoryList } from "../context/useContexts";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { LuAlertTriangle, LuChevronLeftCircle } from "react-icons/lu";
import { ButtonCustom } from "../components/ButtonCustom";
import { Category } from "../types/Category";

// Interface for new category input form
interface NewCategoryInputs {
  newCategory: string;
}

export const NewCategoryForm = () => {
  const { createCategory } = useCategoryList();
  const navigate = useNavigate();
  // React Hook Form for handling new category form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCategoryInputs>();

  const handleBackButton = () => {
    navigate("/image-form");
  };

  // Form submission handler for creating new category
  const onSubmit: SubmitHandler<NewCategoryInputs> = async (data) => {
    try {
      //Create an object of category with the name form
      const newCategory: Category = { name: data.newCategory };
      await createCategory(newCategory);
      reset();
      //navigate('/'); // Redirect to the previous page (main form page)
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };
  return (
    <section className="h-full overflow-auto flex flex-col pt-8 px-6 gap-6 w-full md:justify-center md:items-center">
      <div className="flex flex-col gap-6 md:w-1/2 xl:w-[650px]">
        <div className="flex items-center">
          <ButtonCustom
            nameButton={LuChevronLeftCircle}
            textColor={"text-black"}
            bgColor="bg-transparent"
            textSize="text-[16px]"
            hoverBgColor="bg-black/15"
            onClickButton={handleBackButton}
          />
          <p className="ml-1 text-[16px] font-semibold">Back to Form</p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <TextField
                {...register("newCategory", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
                label="New Category"
                variant="outlined"
                className="w-full"
              />
              {errors.newCategory && (
                <p className="text-red-500 flex items-center gap-2 pl-2">
                  <LuAlertTriangle className="" />
                  This field is required
                </p>
              )}
            </div>
            <ButtonCustom nameButton="Save" buttonType="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};
