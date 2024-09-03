import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useProductDetailsQuery } from '../redux/api/product';
const ProductManagement = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useProductDetailsQuery(id);
    if (isLoading)
        return _jsx("div", { children: "...Loading" });
    // console.log(product);
    if (error) {
        console.log(error);
    }
    if (!product)
        return _jsx("div", { children: "No product found" });
    const { _id, photo, name, price, stock } = product.message;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "product-management", children: [_jsx("div", { className: "product-image", children: _jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${photo}`, alt: "" }) }), _jsxs("div", { className: "product-info", children: [_jsx("p", { children: name }), _jsxs("p", { children: ["\u20B9", price] }), _jsxs("p", { children: [stock, " In stock"] })] })] }) }));
};
export default ProductManagement;
