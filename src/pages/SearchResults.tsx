import { useLocation } from "react-router-dom";
import { MasonryImageList } from "../components/ImageList";
import { NotFoundImage } from "../components/NotFoundImage";

export const SearchResults = (): JSX.Element => {
  const location = useLocation();
  const { searchText, filteredImages } = location.state || {
    searchText: "",
    filteredImages: [],
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-between mt-4 mb-2 mx-4">
        <h2 className="ml-0 text-[24px]">Search Results for: {searchText}</h2>
      </div>
      {filteredImages.length === 0 ? (
        <NotFoundImage text="No results found" />
      ) : (
        <MasonryImageList images={filteredImages} />
        /* filteredImages.map((imageCard: ImageCardWithId) => (
          <div key={imageCard.id} className="border-b py-2">
            <h3 className="font-semibold">{imageCard.title}</h3>
            <p>{imageCard.description}</p>
            <img src={imageCard.image} alt={imageCard.title} />
          </div>
        )) */
      )}
    </div>
  );
};
