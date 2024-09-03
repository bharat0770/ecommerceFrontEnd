import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
const CartItemCard = ({ cartItem, incrementHandler, decrementHandler, removeHandler }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "cart-item", children: [_jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${cartItem.photo}`, alt: "product image" }), _jsxs("div", { className: "cart-item-info", children: [_jsxs("div", { className: "cart-item-name", children: [_jsx(Link, { to: `/product/${cartItem.productId}`, children: cartItem.name }), _jsx("p", { children: `₹${cartItem.price}` })] }), _jsxs("div", { className: "cart-item-btns", children: [_jsx("button", { onClick: () => decrementHandler(cartItem), children: "-" }), _jsx("span", { children: cartItem.quantity }), _jsx("button", { onClick: () => incrementHandler(cartItem), children: "+" }), _jsx("button", { onClick: () => removeHandler(cartItem.productId), children: _jsx(FaTrash, {}) })] })] })] }) }));
};
export default CartItemCard;
