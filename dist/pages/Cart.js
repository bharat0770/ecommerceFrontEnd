import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import CartItemCard from "../components/Cartitem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyDiscount, calculatePrice, decreaseQuantity, increaseQuantity, removeFromCart, updateCart, deleteProduct, } from "../redux/reducer/cartReducer";
import axios from "axios";
const Cart = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    const userId = user?._id;
    //?requires optimizing => use debouncing here
    const { token: CancelToken, cancel } = axios.CancelToken.source();
    const { subTotal, tax, shippingCharges, total, discount, cartItems } = useSelector((state) => state.cartReducer);
    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems, dispatch]);
    const [couponCode, setCouponCode] = useState("");
    const [isValidCouponCode, setIsValidCouponCode] = useState(false);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            axios
                .get(`${import.meta.env.VITE_SERVER}/api/v1/payment/discount?coupon=${couponCode}`)
                .then((res) => {
                dispatch(applyDiscount(res.data.discount));
                setIsValidCouponCode(true);
            })
                .catch(() => {
                dispatch(applyDiscount(0));
                cancel();
                setIsValidCouponCode(false);
            });
        }, 1000);
        return () => {
            clearTimeout(timeOutId);
        };
    }, [couponCode]);
    const incrementHandler = (cartItem) => {
        if (cartItem.quantity >= cartItem.stock)
            return;
        dispatch(increaseQuantity({ ...cartItem, quantity: cartItem.quantity + 1 }));
        const { productId } = cartItem;
        dispatch(updateCart({ userId, productId, quantity: 1 }));
    };
    const decrementHandler = (cartItem) => {
        if (cartItem.quantity <= 1)
            return;
        dispatch(decreaseQuantity({ ...cartItem, quantity: cartItem.quantity - 1 }));
        const { productId } = cartItem;
        dispatch(updateCart({ userId, productId, quantity: -1 }));
    };
    const removeHandler = (productId) => {
        dispatch(removeFromCart(productId));
        dispatch(deleteProduct({ userId, productId }));
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "cart", children: [_jsx("main", { children: _jsx(_Fragment, { children: cartItems.map((item, idx) => {
                            return (_jsx(CartItemCard, { cartItem: item, incrementHandler: incrementHandler, decrementHandler: decrementHandler, removeHandler: removeHandler }, idx));
                        }) }) }), _jsxs("aside", { children: [_jsxs("p", { children: ["SubTotal : \u20B9", subTotal] }), _jsxs("p", { children: ["ShippingCharges : \u20B9", shippingCharges] }), _jsxs("p", { children: ["Tax : \u20B9", tax] }), _jsxs("p", { children: ["Discount : ", _jsx("span", { className: "red", children: `-₹${discount}` })] }), _jsxs("b", { children: ["Total : \u20B9", total] }), _jsx("input", { type: "text", placeholder: "coupon code", value: couponCode, onChange: (e) => {
                                setCouponCode(e.target.value);
                            } }), couponCode &&
                            (isValidCouponCode ? (_jsxs("p", { className: "green", children: [discount, " off using the coupon code ", _jsx("code", { children: couponCode })] })) : (_jsx("p", { className: "red", children: "invalid coupon" }))), cartItems.length > 0 && (_jsx("p", { children: _jsx(Link, { className: "checkout-link", to: "/shipping", children: "CheckOut" }) }))] })] }) }));
};
export default Cart;
