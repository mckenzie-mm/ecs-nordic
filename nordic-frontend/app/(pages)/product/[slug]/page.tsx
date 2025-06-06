import { BtnNext, BtnPrev } from "@/app/ui/btns";
import Card from "@/app/ui/card";
import Link from "next/link";

const { ICON_LIST} = require("@/app/templates");
import { getProductPageData } from "@/app/actions/products";
import CartAddWidget from "@/app/ui-client/cart-add-widget";
import ImageWidget from "@/app/ui-client/image-widget";
import { IProductDTO } from "@/app/DTO/productDTO";
import { Key } from "react";

export default async function Product({ params }: {params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const { productDTO, productsDTO } = await getProductPageData(slug);

    type IBreadCrumb = { name: string; url: string; }

    const breadCrumbs: Array<IBreadCrumb> = [
        { name: "Shop", url: "/"},
        { name: productDTO.category, url: `/${productDTO.category}`}, 
        { name: productDTO.name, url: productDTO.name}
    ]
    const len = breadCrumbs.length;

    return (
        <>
            <div className="product"> 
                <section className="section">
                    <div className="product-nav">
                        <nav>
                            <ul className="breadcrumb-list" role="list">
                            {
                               breadCrumbs.map(({ name, url}, idx) => 
                                    <li key={name}>
                                        {
                                            (idx != len - 1) ?
                                            <Link href={url}>{name} /</Link>
                                            : 
                                            <span>{url}</span>
                                        }
                                    </li>)
                            }
                            </ul>
                        </nav>
                        <nav>
                            <ul className="nav-btns" role="list">
                                <li key="btn-prev"><BtnPrev /></li>
                                <li key="btn-next"><BtnNext /></li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section className="section">
                    <div className="product-grid">
                        <ImageWidget 
                            thumbs={productDTO.images} 
                            images={productDTO.images} 
                            category={productDTO.category!} 
                        />
                        <div className="product-details">
                            <h2 className="product-name">{productDTO.name}</h2>
                            <p className="product-price">$ {productDTO.price.toFixed(2)}</p>
                            <p className="product-description">{productDTO.description}</p>
                            <div className="product-availability">
                                {(productDTO.availability > 0) ? "In Stock" : "Out of Stock"}
                            </div>
                            <CartAddWidget productDTO={productDTO}/>
                            <ul className="product-icon" role="list">     
                            {
                                ICON_LIST.map(({ icon } : {icon: string}, idx: number) => <li key={idx}><a href="" ><i className={icon}></i></a></li>)
                            }
                            </ul>
                        
                        </div>
                    </div>
                </section>
            </div>
               
            <div className="similar-products">
                <section className="section">
                    { productDTO && <h2 className="title-similar-products">Similar Products</h2> }
                    <div className="grid-products-similar" style={{marginBottom: "120px"}}>
                    {
                        productsDTO && productsDTO.map((productDTO: IProductDTO, index: Key | null | undefined) => 
                                    <Card productDTO={productDTO} key={index} />)
                    }
                    </div>
                </section>
            </div>  
        </> 
    );
  }