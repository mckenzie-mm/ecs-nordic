"use client"
import { useState } from "react";
import { openCart } from "../ts/ui";
import InputNumber from "./input-number";

import { toCartItem } from "../DTO-mappings/cart-item-mappings";
import { store } from "../services/cart-service";
import { IProductDTO } from "../DTO/productDTO";

export default function CartAdd({ productDTO } : { productDTO : IProductDTO}) {
    const [count, setCount ] = useState(1);

    const addItem = () => {
        const cartItem = toCartItem(productDTO);
        if (!cartItem) return
        cartItem.qty = count;
        store.add(cartItem);
        openCart();
    }

    const increment = () => setCount(c => c + 1);

    const decrement = () => {
        if (count > 1) {
            setCount(c => c - 1)
        }  
    }

    return (
        <>
            <div className="product-quantity">
                <InputNumber value={count} increment={increment} decrement={decrement} />
            </div>
            <button className="product-buy-now" onClick={addItem}>Buy Now</button>
        </>
    );
}

