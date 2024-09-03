import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax: 0,
    discount: 0,
    shippingCharges: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    }
};
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.loading = true;
            const index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            if (index !== -1) {
                state.cartItems[index].quantity += action.payload.quantity || 1;
            }
            else {
                state.cartItems.push(action.payload);
            }
            state.loading = false;
        },
        increaseQuantity: (state, action) => {
            let index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            state.cartItems[index].quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            let index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            state.cartItems[index].quantity -= 1;
        },
        removeFromCart: (state, action) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
            state.loading = false;
        },
        calculatePrice: (state) => {
            const subTotal = state.cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            state.subTotal = subTotal;
            state.shippingCharges = state.subTotal > 1000 ? 0 : 200,
                state.tax = Math.round(state.subTotal * 0.18);
            state.total = state.subTotal + state.shippingCharges + state.tax - state.discount;
        },
        applyDiscount: (state, action) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
        fetchCart: (state, action) => {
            let data = action.payload.map((e) => {
                return {
                    name: e.productId.name,
                    photo: e.productId.photo,
                    quantity: e.quantity,
                    productId: e.productId._id,
                    price: e.productId.price
                };
            });
            state.cartItems = data;
        },
        updateCart: (state, action) => {
            const data = {
                userId: action.payload.userId,
                cartItems: [
                    {
                        productId: action.payload.productId,
                        quantity: action.payload.quantity
                    }
                ]
            };
            axios.post(`${import.meta.env.VITE_SERVER}/api/v1/cart/add`, data)
                .then((res) => { console.log("cart updated successfully"); }).catch((err) => { if (err)
                toast.error("an error occurred"); });
        },
        deleteProduct: (state, action) => {
            const data = {
                userId: action.payload.userId,
                productId: action.payload.productId,
            };
            axios.patch(`${import.meta.env.VITE_SERVER}/api/v1/cart/remove`, data)
                .then((res) => { console.log("cart updated successfully"); }).catch((err) => { if (err)
                toast.error("an error occurred"); });
        }
    }
});
export default cartReducer;
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, calculatePrice, applyDiscount, saveShippingInfo, resetCart, fetchCart, updateCart, deleteProduct } = cartReducer.actions;
