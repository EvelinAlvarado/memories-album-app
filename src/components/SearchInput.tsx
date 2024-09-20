import { LuSearch, LuX } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImageCard } from "../context/useContexts";
import { ImageCardWithId } from "../types/ImageCard";

export const SearchInput = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const { imagesCards } = useImageCard();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    console.log("text-search:", event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Filter the images to find a match with the text
    const filteredImages: ImageCardWithId[] = imagesCards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchText.toLowerCase()) ||
        card.description.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("filteredImages: ", filteredImages);
    //Navigate to the page search results and pass the filtered results
    navigate("/search-results", { state: { searchText, filteredImages } });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg focus:outline-none focus:border-tag1 transition-all duration-300 shadow-md"
    >
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <LuSearch />
      </button>
      <input
        className="rounded-md px-9 py-3 border-transparent focus:outline-none focus:border-tag1 placeholder-gray-400 transition-all duration-300 w-full"
        placeholder="Search..."
        /* required="" */
        type="text"
        value={searchText}
        onChange={handleSearch}
      />
      <button
        onClick={() => setSearchText("")}
        type="reset"
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
      >
        <LuX />
      </button>
    </form>
  );
};
