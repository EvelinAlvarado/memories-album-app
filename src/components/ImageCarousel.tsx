import Slider from "react-slick";
import { useImageCard } from "../context/useContexts";

// Helper function to generate unique random indices
const getRandomIndices = (length: number, count: number): number[] => {
  const indices = new Set<number>();
  // const indices: Set<number> = new Set();
  while (indices.size < count) {
    const randomIndices = Math.floor(Math.random() * length);
    indices.add(randomIndices);
  }
  /* console.log(indices);
  console.log(Array.from(indices)); */
  return Array.from(indices);
};

const imgDefault = [
  "/img/photo-default-1.png",
  "/img/photo-default-2.png",
  "/img/photo-default-3.png",
];

export const ImageCarousel = () => {
  const { imagesCards } = useImageCard();
  // Number of random images you want to display
  const numberOfRandomImages = 5;
  // Generate unique random indices
  const randomIndices =
    imagesCards.length > 0
      ? getRandomIndices(imagesCards.length, numberOfRandomImages)
      : [];

  // Slider settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    /* centerPadding: "60px", */
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  console.log(Math.floor(Math.random() * imagesCards.length));
  return (
    <div className="slider-container h-full">
      <Slider {...settings} className="h-full">
        {imagesCards.length === 0
          ? imgDefault.map((image, index) => (
              <div key={index} className="h-full px-2">
                <div className="h-full flex justify-center items-center">
                  <img
                    className="rounded-lg h-[calc(100vh-350px)] w-full object-cover"
                    src={image}
                    alt={`default-img-${index}`}
                  />
                </div>
              </div>
            ))
          : randomIndices.map((index) => (
              <div key={imagesCards[index].id} className="h-full px-2">
                <div className="h-full flex justify-center items-center">
                  <img
                    className="rounded-lg h-[calc(100vh-350px)] w-full object-cover"
                    src={imagesCards[index].image}
                    alt={imagesCards[index].title}
                  />
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
};
