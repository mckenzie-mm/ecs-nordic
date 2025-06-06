"use client"
const { ASPECT_RATIO_IMAGE } = require( "@/app/templates");
import { putProduct, postProduct } from "@/app/actions/admin";
import { HREF } from "@/app/aws-images/s3-configuration";
import Link from "next/link";


import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import { getPhotos } from "./getPhotos";
import { IFormDTO } from "@/app/DTO/formDTO";

export default function Form({ formDTO }: { formDTO: IFormDTO }) {
    const [photos, setPhotos] = useState<Array<string>>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<Array<string>>(formDTO.images);
    const [categoryName, setCategoryName] = useState(formDTO.category); 

    useEffect(() => {
        (async function(){
            const photos = await getPhotos(categoryName!);
            setPhotos(photos);   
        })();
    }, [categoryName]);

    const handleSelect: ChangeEventHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategoryName(e.target.value);  
    }
   
    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update selected photos
        const newSelectedPhotos: Array<string> = [];
        if (e.target.checked) {
            newSelectedPhotos.push(e.target.value);
        }
        selectedPhotos.forEach(photo => {
            if (photo !== e.target.value) {
                newSelectedPhotos.push(photo);
            }
        })
        setSelectedPhotos(newSelectedPhotos);
    }

    const handleProduct = formDTO.id ? putProduct.bind(null, formDTO.id) : postProduct;
    
    return (
        <form className="product" action={handleProduct}>          
            <input 
                type="text" 
                name="slug" 
                defaultValue={formDTO?.slug || ""} 
                hidden
            />
            <section className="section">
                <div className="edit-product-header">
                    <h2 className="edit-product-title">{formDTO.id ? "Edit" : "Create"} Product</h2>   
                    <div className="edit-btn-wrap">
                        <Link href="/admin" className="edit-btn-cancel">Cancel</Link>
                        <button className="edit-btn-save" type="submit">Save</button>
                    </div>   
                </div> 
            </section>
            
            <section className="section">
                <div className="edit-product-grid">
                    <div>
                        <div className="edit-product-image-header">
                            <h2 className="edit-product-image-header-title">Images:</h2>
                            <select  name="category" value={categoryName} onChange={handleSelect}  style={{marginBottom: "10px", padding: "5px"}}>
                            {
                                formDTO.categories.map(({ name }) => {
                                    return  <option key={name} value={name}>
                                            {name}
                                            </option>
                                })
                            }
                            </select>
                        </div>   
                        <div className="bucket-image-widget-container" >
                            <ul className="bucket-image-widget-list" role="list">
                            {
                                photos.map((photoKey) => {   
                                    const photoUrl = HREF + "thumbnails/" + categoryName + "/" + encodeURIComponent(photoKey);  
                                    return (
                                        <li key={photoKey} className="bucket-image-widget-li">
                                            <div className="bucket-image-widget-img-wrap" >
                                                <label >
                                                    <input 
                                                        type="checkbox" 
                                                        id={photoKey} 
                                                        value={photoKey} 
                                                        // name={"images"} 
                                                        onChange={handleSelectImage}
                                                        defaultChecked={formDTO.images!.includes(photoKey)}
                                                    />
                                                    <img 
                                                        src={photoUrl} 
                                                        className="bucket-image-widget-img"
                                                        alt="form image"
                                                        style={{border: "1px solid #bbb", aspectRatio: ASPECT_RATIO_IMAGE}}
                                                    />
                                                </label>
                                            </div>
                                        </li>);
                                    }
                                )
                            }
                            </ul>
                        </div>
                    </div>
                    
                    <div className="edit-product-details">
                       
                        <label htmlFor="name" className="edit-form-label">Product Name:</label>
                        <input 
                            type="text" 
                            id="edit-form-name" 
                            name="name" 
                            defaultValue={formDTO.name} 
                            className="edit-form-name"
                        />
                      
                        <br/>
                        <label htmlFor="description" className="edit-form-label">Description:</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            className="edit-form-description"
                            defaultValue={formDTO.description}
                        />
                         <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <label htmlFor="Price" className="edit-form-label">Price $:</label>
                                <input 
                                    className="edit-form-price"
                                    type="number" 
                                    id="price" 
                                    defaultValue={(formDTO.price).toFixed(2)} 
                                    name="Price" 
                                    min="1" 
                                    step=".01"
                                />
                            </div>
                            <div>
                                <label htmlFor="availability" className="edit-form-label">Stock Quantity:</label>
                                <input 
                                    id="availability"
                                    name="availability"
                                    type="number" 
                                    className="edit-form-availability" 
                                    defaultValue={formDTO.availability}
                                /> 
                            </div>     
                        </div>
                        <label htmlFor="price" className="edit-form-label">Select Default Image:</label>
                         <ul className="form-thumbnail-list" role="list">
                        {
                            selectedPhotos.map((thumb, index) => {
                                const src = HREF + "thumbnails/" + categoryName + "/" + encodeURIComponent(thumb); 
                                return ( 
                                 <li key={index} className="thumbnail" >
                                    <label className="thb-select">
                                        <input 
                                            type="checkbox"
                                            name="images" 
                                            value={thumb}
                                            checked={true} 
                                            onChange={() => {}} 
                                            hidden
                                        />
                                        <img 
                                            src={src} 
                                            className="thumbnail-img"
                                            alt="thumbnail image"
                                        />
                                    </label>
                                </li>)
                            })    
                        } 
                        </ul>
                    </div>
                </div>
            </section>
        </form>

    );
  }

  