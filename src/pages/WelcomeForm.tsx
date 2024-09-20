import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { useUser } from "../context/useContexts";
import { useEffect, useState } from "react";

interface Inputs {
  userName: string;
}

export const WelcomeForm = () => {
  const navigate = useNavigate();
  const { createUser, currentUser } = useUser();
  const [isUserCreated, setIsUserCreated] = useState(false);
  /* const [name, setName] = useState(""); */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    console.log("boton presionado");
    try {
      //const createdUser = await createUser(data.userName);
      await createUser(data);
      /* const { id, ...cleanUser } = createdUser;
      setCurrentUser(cleanUser); */
      setIsUserCreated(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (isUserCreated && currentUser?.id) {
      console.log("Current User after creation:", currentUser);
      navigate(`/user-home/${currentUser.id}`);
    }
  }, [currentUser, isUserCreated, navigate]);
  return (
    <div className="h-screen px-6 py-12 flex flex-col gap-14 w-screen md:items-center">
      <span className="text-[26px]">Welcome!</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-11 md:w-1/2 xl:w-[650px]"
      >
        <div>
          <input
            className="w-full border-solid border-black border-2 rounded-md px-3.5 py-2.5"
            type="text"
            placeholder="Name"
            {...register("userName", {
              required: true,
              minLength: 1,
              maxLength: 20,
            })}
            /* value={name} */
            /* onChange={handleChangeName} */
          />
          {errors.userName && (
            <span className="text-red-500 flex items-center gap-2 pl-2">
              <LuAlertTriangle className="" />
              This field is required
            </span>
          )}
        </div>
        <ButtonCustom nameButton="Enter" buttonType="submit" />
      </form>
    </div>
  );
};
