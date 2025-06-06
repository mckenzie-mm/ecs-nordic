import { findAll } from "../actions/products";
import ProductsListByCategory from "../ui-client/products-list-by-category";

export default async function Home() {
  const productsDTO = await findAll(1, 12);   
  return  <ProductsListByCategory 
            inititalProducts={productsDTO!} 
            hasMore={true} 
          /> ;
}
