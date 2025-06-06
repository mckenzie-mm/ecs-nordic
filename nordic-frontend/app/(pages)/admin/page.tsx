
import { deleteProduct, getCount } from "@/app/actions/admin";
import { findAll } from "@/app/actions/products"
import { HREF } from "@/app/aws-images/s3-configuration";
import { IProductDTO } from "@/app/DTO/productDTO";
import { BinIcon, AddIcon, EditIcon } from "@/app/icons-svg";
import BtnReset from "@/app/ui-client/btn-reset";
const { ASPECT_RATIO_IMAGE } = require( "@/app/templates");

import Pagination from "@/app/ui-client/pagination";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default async function Page(props: { searchParams?: Promise<{ page?: string; }>; }) {

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const count = await getCount(ITEMS_PER_PAGE);  
    
    const productsDTO = await findAll(currentPage, ITEMS_PER_PAGE) as Array<IProductDTO>;

    return (
        <div className="admin">
            <div className="admin-header-wrap">
                <h2 className="admin-header-title">Products List</h2>
                <div className="admin-header-nav">
                    <Pagination count={count} />
                    <BtnReset />
                    <Link
                        href={`/admin/edit/`}
                        className="admin-create-btn-wrap"
                    >
                        <i className="admin-create-btn-icon"><AddIcon /></i>
                        <div className="admin-create-btn-txt">Item</div>
                    </Link>
                </div>     
            </div>
            <ul className="admin-list" role="list">
            { productsDTO.length?
                <li 
                    className="admin-list-item" 
                    style={{borderBottom: "1px solid #f1f1f1", marginBottom: "0px"}}
                >
                    <span>ID</span>
                    <span>Image</span>
                    <span>Name</span>
                    <span>Slug</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Qty</span>
                </li>
                : <></>
            }
            {
                productsDTO.map(({ name, id, price, availability, slug, images, category }) => {
                    const src = HREF + "thumbnails/" + category + "/" + encodeURIComponent(images[0]); 
                    let deleteProductWithId;
                    if (id) {
                        deleteProductWithId = deleteProduct.bind(null, id);
                    }

                    return (
                        <li key={id} className="admin-list-item">
                            <span>{id}</span>
                            <div className="admin-list-img-wrap">
                                <img 
                                    src={src} 
                                    className="admin-list-img" 
                                    alt="product image" 
                                    style={{aspectRatio: ASPECT_RATIO_IMAGE}}
                                />
                            </div>
                            <span>{name}</span>
                            <span>{slug}</span>
                            <span>{category}</span>
                            <span>{price}</span>
                            <span>{availability}</span>
                            <div className="admin-btn-wrap">
                                <Link
                                    href={`/admin/edit/${slug}`}
                                    className="admin-edit-btn"
                                >
                                    <i className="admin-edit-btn-icon"><EditIcon /></i>
                                </Link>
                                <form action={deleteProductWithId}>
                                    <button type="submit" className="admin-delete-btn">
                                        <i className="admin-delete-btn-icon"><BinIcon /></i>
                                    </button>
                                </form>           
                            </div>                  
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
