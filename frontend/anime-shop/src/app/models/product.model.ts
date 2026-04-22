export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  link: string;
  likes: number;
  fandom: string;
  categoryId: number;
  isFavorite?: boolean;
  isLiked?: boolean;
}