import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import ProductCard from '../components/Product-card';
import { useLatestProductQuery } from '../redux/api/product';
import { Loader } from "../components/loader";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../redux/reducer/cartReducer';
const Home = () => {
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    const userId = user?._id;
    const dispatch = useDispatch();
    const { data, isError, isLoading } = useLatestProductQuery("");
    if (isError)
        toast.error("Cannot fetch products");
    const addToCartHandler = (cartItem) => {
        if (cartItem.stock < 1)
            return toast.error("Out of stock");
        dispatch(addToCart(cartItem));
        toast.success("Added to cart");
        const { productId, quantity } = cartItem;
        dispatch(updateCart({ userId, productId, quantity, }));
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "home-content", children: [_jsx("div", { className: "big-image", children: "  " }), _jsxs("h1", { children: ["latest products", _jsx(Link, { className: "more-link", to: "/search", children: "more" })] }), _jsx("main", { className: "home-products", children: isLoading ? _jsx(Loader, {}) :
                        data?.message && Array.isArray(data.message) && data.message.map((i) => (_jsx(ProductCard, { name: i.name, productId: i._id, photo: i.photo, price: i.price, stock: i.stock, handler: addToCartHandler }, i._id))) })] }) }));
};
export default Home;
