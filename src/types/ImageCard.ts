export interface ImageCard {
  title: string;
  image: string;
  description: string;
  categoriesIds: string[];
}

export interface ImageCardWithId extends ImageCard {
  id: string;
}
