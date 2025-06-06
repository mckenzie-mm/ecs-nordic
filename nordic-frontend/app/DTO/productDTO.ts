export type IProductDTO = {
  id?: number;
  category?: string;
  slug?: string;
  name: string;
  price: number; 
  description?: string;
  images: Array<string>; 
  availability: number; 
}

