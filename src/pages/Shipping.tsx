import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartReducerInitialState } from '../types/reducer-types';
import { saveShippingInfo } from '../redux/reducer/cartReducer';

let Shipping = () => {
    const { cartItems, total } = useSelector((state: { cartReducer: cartReducerInitialState }) => state.cartReducer)
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
        pinCode : "",
    })
    
    let stateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    let submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log("shipping info", shippingInfo); 
        dispatch(saveShippingInfo(shippingInfo)); 
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/create`, {
            amount: total
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        navigate("/pay", {
            state: data.clientSecret,
        })
    }
    return (
        <div className='shippingDetails'>
            <form onSubmit={submitHandler}>
            <h1>Shipping Info</h1>
                <input type="text"
                    placeholder="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={stateChange}
                    required
                />
                <input type="text"
                    placeholder="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={stateChange}
                    required
                />
                <input type="text"
                    placeholder="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={stateChange}
                    required
                />
                <select name="country"
                    value={shippingInfo.country}
                    
                    onChange={stateChange}
                >
                    <option value="India">India</option>
                    <option value="US">Us</option>
                    <option value="Japan">Japan</option>
                </select>

                <input type="text"
                    placeholder="pinCode"
                    name="pinCode"
                    value={shippingInfo.pinCode}
                    onChange={stateChange}
                    required
                />
                <button type="submit" className="btn-pay">pay now</button>
            </form>
        </div>
    )
}
export default Shipping;
