import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";

export const WelcomeForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("boton presionado");
    navigate("/user-home");
  };
  return (
    <div className="h-screen px-6 py-12 flex flex-col gap-14 w-screen">
      <span className="text-[26px]">Welcome!</span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-11">
        <input
          className="border-solid border-black border-2 rounded-md px-3.5 py-2.5"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleChangeName}
        />
        <ButtonCustom nameButton="Enter" buttonType="submit" />
      </form>
    </div>
  );
};
