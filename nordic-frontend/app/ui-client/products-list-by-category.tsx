"use client";
import { useState } from "react";
import { findAll, findByCategory } from "../actions/products";
import Card from "../ui/card";
import { IProductDTO } from "../DTO/productDTO";
const { LOAD_MORE, ALL_PRODUCT_LOADED } = require("../templates");

const ITEMS_PER_PAGE = 12;

export default function ProductsList({ 
    inititalProducts,
    category,
    hasMore
}: { 
    inititalProducts: Array<IProductDTO>,
    category?: string,
    hasMore: boolean,
}) {

  const [page, setPage] = useState(2);
  const [productsDTO, setProductsDTO] = useState<IProductDTO[]>(inititalProducts);
  const [hasMoreData, setHasMoreData] = useState(hasMore);

  const loadMore = async () => {
    if (hasMoreData) {

      let apiPosts: ConcatArray<IProductDTO>;
      if (category) {
        apiPosts = await findByCategory(category, page, ITEMS_PER_PAGE);
      } else {
        apiPosts = await findAll(page, ITEMS_PER_PAGE);
      }

      if (!apiPosts.length) {
        setHasMoreData(false);
      }
      setProductsDTO((prevPosts) => prevPosts.concat(apiPosts));
      setPage((page) => page + 1);
    }
  };

  return (
    <>
        <section className="section">
            <div className="grid-products">
            {productsDTO.map((productDTO, index) => 
                <Card productDTO={productDTO} key={index} />)
            }
            </div>
        </section>
        <section className="section">
        {
            hasMoreData ?
                <button onClick={loadMore} className="products-list-btn">
                    {LOAD_MORE}
                </button>
            :
                <div className="products-list-notify">
                    <span>{ALL_PRODUCT_LOADED}</span>
                </div>
        }
        </section>
    </>
  );
}

  