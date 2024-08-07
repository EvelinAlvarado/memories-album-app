import { LuSearch, LuX } from "react-icons/lu";

export const SearchInput = () => {
  return (
    <form className="relative rounded-lg focus:outline-none focus:border-tag1 transition-all duration-300 shadow-md">
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <LuSearch />
      </button>
      <input
        className="rounded-md px-9 py-3 border-transparent focus:outline-none focus:border-tag1 placeholder-gray-400 transition-all duration-300 w-full"
        placeholder="Search..."
        required=""
        type="text"
      />
      <button
        type="reset"
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
      >
        <LuX />
      </button>
    </form>
  );
};
