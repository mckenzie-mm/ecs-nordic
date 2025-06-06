"use client"
import { openCart } from "../ts/ui";
import { toCartItem } from "../DTO-mappings/cart-item-mappings";
import { store } from "../services/cart-service";
import { IProductDTO } from "../DTO/productDTO";

export default function BtnBuy({ productDTO } : {
    productDTO: IProductDTO
}) {

    const cartItem = toCartItem(productDTO);
    if (!cartItem) return;
    const addItem = () => {
        store.add(cartItem);
        openCart();
    }

    return (
        <button className="btn-buy" onClick={addItem}>
            <span>$ {productDTO.price.toFixed(2)}</span>
        </button>
    );
}

