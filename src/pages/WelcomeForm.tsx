import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";

interface Inputs {
  userName: string;
}

export const WelcomeForm = () => {
  const navigate = useNavigate();
  /* const [name, setName] = useState(""); */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  /* const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  }; */

  /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("boton presionado");
    navigate("/user-home");
  }; */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log("boton presionado");
    navigate("/user-home");
  };
  return (
    <div className="h-screen px-6 py-12 flex flex-col gap-14 w-screen">
      <span className="text-[26px]">Welcome!</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
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
