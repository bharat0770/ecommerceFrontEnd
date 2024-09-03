import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { addToCart } from '../redux/reducer/cartReducer'
import { cartItem } from '../types/types';
type productProps = {
    productId: string,
    photo: string,
    name: string,
    price: number,
    stock: number,
    handler: (cartItem: cartItem) => string | undefined;
}
const ProductCard = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler,
}: productProps) => {
    return (
        <>
            <div className="product-card">
                <img src={`${import.meta.env.VITE_SERVER}/uploads/${photo}`} alt="product-image" />
                <p className="product-name">{name}</p>
                <span className="product-price">₹{price}</span>
                <div className="opac-btn">
                    <button onClick={() => handler({ productId, photo, stock, price, name, quantity: 1 })}><FaPlus /></button>
                </div>
            </div>
        </>
    )
}
export default ProductCard;
