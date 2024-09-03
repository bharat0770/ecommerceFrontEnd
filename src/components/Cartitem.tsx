import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cartItem } from "../types/types";
import { FaTrash } from "react-icons/fa";

type Cartprops = {
    cartItem: cartItem,
    incrementHandler: (cartItem: cartItem) => void,
    decrementHandler: (cartItem: cartItem) => void,
    removeHandler: (productId: string) => void,
}
const CartItemCard = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: Cartprops) => {
    return (
        <>
            <div className="cart-item">
                <img src={`${import.meta.env.VITE_SERVER}/uploads/${cartItem.photo}`} alt="product image" />
                <div className="cart-item-info">
                    <div className="cart-item-name">
                        <Link to={`/product/${cartItem.productId}`}>{cartItem.name}</Link>
                        <p>{`₹${cartItem.price}`}</p>
                    </div>
                    <div className="cart-item-btns">
                        <button onClick={() => decrementHandler(cartItem)}>-</button>
                        {/* <span>{cartItem.quantity}</span> */}
                        <span>{cartItem.quantity}</span>
                        <button onClick={() => incrementHandler(cartItem)}>+</button>
                        <button onClick={() => removeHandler(cartItem.productId)}><FaTrash /></button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CartItemCard; 
