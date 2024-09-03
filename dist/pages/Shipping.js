import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../redux/reducer/cartReducer';
let Shipping = () => {
    const { cartItems, total } = useSelector((state) => state.cartReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (cartItems.length <= 0) {
            return navigate("/");
        }
    }, [cartItems]);
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "india ",
        pinCode: "",
    });
    let stateChange = (e) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    let submitHandler = async (e) => {
        e.preventDefault();
        console.log("shipping info", shippingInfo);
        dispatch(saveShippingInfo(shippingInfo));
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/create`, {
            amount: total
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        navigate("/pay", {
            state: data.clientSecret,
        });
    };
    return (_jsx("div", { className: 'shippingDetails', children: _jsxs("form", { onSubmit: submitHandler, children: [_jsx("h1", { children: "Shipping Info" }), _jsx("input", { type: "text", placeholder: "address", name: "address", value: shippingInfo.address, onChange: stateChange, required: true }), _jsx("input", { type: "text", placeholder: "city", name: "city", value: shippingInfo.city, onChange: stateChange, required: true }), _jsx("input", { type: "text", placeholder: "state", name: "state", value: shippingInfo.state, onChange: stateChange, required: true }), _jsxs("select", { name: "country", value: shippingInfo.country, onChange: stateChange, children: [_jsx("option", { value: "India", children: "India" }), _jsx("option", { value: "US", children: "Us" }), _jsx("option", { value: "Japan", children: "Japan" })] }), _jsx("input", { type: "text", placeholder: "pinCode", name: "pinCode", value: shippingInfo.pinCode, onChange: stateChange, required: true }), _jsx("button", { type: "submit", className: "btn-pay", children: "pay now" })] }) }));
};
export default Shipping;
