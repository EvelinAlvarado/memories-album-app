import { Link } from "react-router-dom";
import { LuHome, LuGrid, LuUserCircle } from "react-icons/lu";
import { useUser } from "../context/useContexts";

export const Navbar = () => {
  const { currentUser } = useUser();
  return (
    /* whithout fixed */
    <nav className="flex justify-center bottom-0 right-0 px-6 w-full">
      <ul className="flex flex-row w-full justify-between ">
        <li className="p-4 flex items-center justify-center text-black rounded-xl hover:bg-black/15 active:scale-95 transform transition duration-300">
          <Link to={`/user-home/${currentUser?.id}`}>
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
          <Link to={`/user/${currentUser?.id}`}>
            <LuUserCircle className="text-[24px]" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
