import { LuPencilLine, LuUserCheck, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export const User = () => {
  const navigate = useNavigate();

  const handleClickOut = () => {
    navigate("/");
  };
  return (
    <div className="my-12 mx-4 bg-green-400  h-full">
      <div className="relative flex flex-row rounded-lg focus:outline-none focus:border-tag1 bg-gray-400 transition-all duration-300 shadow-md w-full">
        <input
          className="rounded-lg pl-4 pr-12 py-3 border-transparent focus:outline-none focus:border-tag1 placeholder-gray-400 transition-all duration-300 w-full"
          placeholder="Name to edit..."
          type="text"
        />
        <button
          type="reset"
          className="absolute text-xl p-4 top-0 right-0 items-center"
        >
          <LuPencilLine />
          {/* <LuUserCheck /> */} {/* toggle click*/}
        </button>
      </div>
      <div className="flex flex-row justify-between items-center mt-8">
        <p>Logout</p>
        <button onClick={handleClickOut} className="p-4 text-lg">
          <LuLogOut />
        </button>
      </div>
    </div>
  );
};
