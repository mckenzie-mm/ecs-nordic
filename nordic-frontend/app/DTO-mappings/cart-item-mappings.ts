
import { ICartItem } from "../DTO/cart";
import { IProductDTO } from "../DTO/productDTO";

export const toCartItem = (productDTO: IProductDTO, qty = 1) => {
    if (!productDTO.id) {
        return;
    }
    const cartItem : ICartItem = {
        id: productDTO.id,
        name: productDTO.name,
        category: productDTO.category!,
        image: productDTO.images[0]!,
        price: productDTO.price,
        slug: productDTO.slug!,
        qty: qty
    }
    return cartItem;
}