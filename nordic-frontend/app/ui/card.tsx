import Link from "next/link";

import BtnBuy from "../ui-client/btn-buy";
import { BtnLike } from "./btns";
import { HREF } from "../aws-images/s3-configuration";
import { IProductDTO } from "../DTO/productDTO";

export default function Card({ productDTO }: {
    productDTO: IProductDTO;
}) {
    const { name, images, slug, category } = productDTO;
    const thb = HREF + "thumbnails/" + category + "/" + encodeURIComponent(images[0]); 
    const src = HREF + category + "/" + encodeURIComponent(images[0]); 
    return (
        <div className="card">    
             <div className="card-img-wrap" >
                <Link href={`/product/${slug}`}>
                    {/* <img alt="placeholder" src={"bakgnd.png"} className="bakgnd" /> */}
                    <img alt="fade-in" src={thb} className="bakgnd" />
                    <img  alt={name} className="products-img" src={src} />
                </Link>
            </div>        
                    
            <div className="card-caption">
                <ul className="card-detail-list">
                    <li key="card-link"><Link href="" className="card-link">{name}</Link></li>
                    <li key="btn-buy"><BtnBuy productDTO={productDTO}/></li>                                    
                </ul>
                <div className="card-like">
                    <BtnLike />
                </div>
            </div>
        </div>
    );
}