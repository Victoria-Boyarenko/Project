import { Product } from './product.model';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  favorites: Product[];
}