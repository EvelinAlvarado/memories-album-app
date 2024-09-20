import {
  LuPencilLine,
  LuLogOut,
  LuCheckCircle,
  LuAlertTriangle,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { useUser } from "../context/useContexts";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  userName: string;
}

export const User = () => {
  const navigate = useNavigate();
  /* const { userId } = useParams<{ userId: string }>(); */
  /* console.log(userId); */
  const { currentUser, updateUser } = useUser();
  console.log("CurrentUser: ", currentUser);

  const [image, setImage] = useState<string>(
    "https://w7.pngwing.com/pngs/628/989/png-transparent-ux-ui-account-profile-user-avatar-ux-ui-simple-icon.png"
  ); // Estado para almacenar la imagen de perfil
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false); // Estado para controlar si estamos en modo de edición
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  console.log(isEditingImage);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { userName: currentUser?.userName || "" },
  });

  // Sync form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      // Set the current user name when the component mounts or when currentUser changes
      setValue("userName", currentUser.userName || "");
    }
  }, [currentUser, setValue]);

  const handleClickOut = () => {
    navigate("/");
    // Optionally clear user data or perform other logout operations
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsEditingImage(true); // Set flag if you need to handle image saving later
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Name changes to: ", data);

    if (currentUser) {
      // Create a new user object with updated userName
      const editedUser = { ...currentUser, userName: data.userName };
      // Call updateUser with the updated user object
      await updateUser(currentUser.id, editedUser);

      setValue("userName", editedUser.userName);
      setIsEditingName(false); // Exit edit mode after submitting
      //reset({ userName: updatedUser.userName }); // Reset the form with the updated username

      // Debug log to check currentUser after editing
      console.log("Current User after edition:", editedUser);
    }
  };
  return (
    <div className="my-12 mx-4 h-full w-full md:flex md:justify-center ">
      <div className="flex flex-col gap-6 md:w-1/2 xl:w-[650px] md:text-center">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="rounded-full w-24 h-24 mb-4 object-cover cursor-pointer"
              onClick={() => document.getElementById("imageUpload")?.click()} // Click en input oculto
            />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Edit Name */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex">
                <div>
                  <input
                    className="border-solid border-black border-2 rounded-md px-3.5 py-2.5"
                    type="text"
                    placeholder="Name"
                    {...register("userName", {
                      required: true,
                      minLength: 1,
                      maxLength: 20,
                    })}
                  />
                  {errors.userName && (
                    <span className="text-red-500 flex items-center gap-2 pl-2">
                      <LuAlertTriangle className="" />
                      This field is required
                    </span>
                  )}
                </div>
                {/* Submit button to save the name */}
                <ButtonCustom
                  nameButton={LuCheckCircle}
                  paddingX="px-1"
                  bgColor="bg-transparent"
                  textColor="text-gray-500"
                  buttonType="submit"
                />
              </form>
            ) : (
              <div className="flex gap-0.5 items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentUser?.userName}
                </h2>
                {/* Button to enable editing */}
                <ButtonCustom
                  nameButton={LuPencilLine}
                  paddingX="px-1"
                  bgColor="bg-transparent"
                  textColor="text-gray-500"
                  onClickButton={() => setIsEditingName(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="flex flex-row justify-between items-center mt-8">
          <p>Logout</p>
          <button onClick={handleClickOut} className="p-4 text-lg">
            <LuLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};
