import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/ButtonCustom";

export const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/welcome");
  };

  return (
    <div className="h-screen flex flex-col">
      <div
        className="h-[60%] bg-cover bg-center rounded-b-xl"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1484603738253-e5b73679e8cb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      ></div>
      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center">
          <span className="pb-12 text-[26px] text-left pr-16">
            Together, Let's Create Unforgettable Moments of Your Life
          </span>
          <ButtonCustom
            nameButton="Get’s started"
            onClickButton={handleStart}
          />
        </div>
      </div>
    </div>
  );
};
