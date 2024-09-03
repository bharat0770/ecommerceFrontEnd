import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FaPlus } from 'react-icons/fa';
const ProductCard = ({ productId, photo, name, price, stock, handler, }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "product-card", children: [_jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${photo}`, alt: "product-image" }), _jsx("p", { className: "product-name", children: name }), _jsxs("span", { className: "product-price", children: ["\u20B9", price] }), _jsx("div", { className: "opac-btn", children: _jsx("button", { onClick: () => handler({ productId, photo, stock, price, name, quantity: 1 }), children: _jsx(FaPlus, {}) }) })] }) }));
};
export default ProductCard;
