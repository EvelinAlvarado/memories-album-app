import { Link } from "react-router-dom";
import { LuHome, LuSettings2, LuGrid, LuUserCircle } from "react-icons/lu";

export const Navbar = () => {
  return (
    <nav className="flex justify-center fixed bottom-0 right-0 px-6 w-full">
      <ul className="flex flex-row w-full justify-between ">
        <li className="p-4 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300">
          <Link to="/user-home">
            <LuHome className="text-[24px]" />
          </Link>
        </li>
        {/* <li className="p-4 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300">
          <Link to="">
            <LuSettings2 className="text-[24px]" />
          </Link>
        </li> */}
        <li className="p-4 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300">
          <Link to="/gallery">
            <LuGrid className="text-[24px]" />
          </Link>
        </li>
        <li className="p-4 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300">
          <Link to="/user">
            <LuUserCircle className="text-[24px]" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
