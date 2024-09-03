import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useAllProductQuery } from '../../redux/api/product';
import { useNavigate } from 'react-router-dom';
const AllProductCard = ({ id, name, photo, price, stock, category }) => {
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${photo}`, alt: "product image" }), _jsxs("span", { children: ["productId : ", id] }), _jsxs("span", { children: ["name : ", name] }), _jsxs("span", { children: ["price : ", price] }), _jsxs("span", { children: ["stock : ", stock] }), _jsxs("span", { children: ["category : ", category] }), _jsx("span", { children: _jsx("button", { className: "product-manage", onClick: () => { navigate(`/admin/product/update/?id=${id}`); }, children: "manage" }) })] }));
};
const allProducts = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data } = useAllProductQuery(user?.email);
    console.log(data);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "all-products", children: data?.message.map((e) => (_jsx("div", { className: "all-products-item", children: _jsx(AllProductCard, { id: e._id, name: e.name, photo: e.photo, price: e.price, stock: e.stock, category: e.category }) }))) }) }));
};
export default allProducts;
