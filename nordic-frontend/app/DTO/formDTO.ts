import { ICategoryDTO } from "./categoryDTO";

export type IFormDTO = {
  id?: number;
  category?: string;
  slug?: string;
  name: string;
  price: number; 
  description: string;
  images: Array<string>; 
  availability: number; 
  categories: Array<ICategoryDTO>
}
