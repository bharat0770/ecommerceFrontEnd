import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMyOrderQuery } from "../redux/api/order";
import { customError } from "../types/api-types";
import { userReducerInitialState } from "../types/reducer-types";
const Orders = () => {
    const { user, loading } = useSelector(
        (state: { userReducer: userReducerInitialState }) => {
            return state.userReducer;
        }
    );
    const { data, isError, error, isLoading } = useMyOrderQuery(user?._id!);
    if (error) {
        const err = error as customError;
        toast.error(err.data?.message);
    }
    return (
        <div className="transaction">
            <div className="orderItems">
                <h1>transactions</h1>
                {data?.message.map((order) => (
                    <OrderCard
                    id = {order._id}
                    amount = {order.total}
                    discount = {order.discount}
                    status = {order.status}
                    />
                ))}
            </div>
        </div>
    );
};


const OrderCard = ({id,  amount, discount, status}) => {
    return (
        <>
        <div className='transaction-items'>
            <span>orderId : {id}</span>
            <span>amount : {amount}</span>
            <span>discount : {discount}</span>
            <span>
                status : 
            <span className={`${status==="processing"? "red" : status==="shipped"? "green":"purple"}`}>  {status}</span>
            </span>
            </div>
        </>
    )
}

export default Orders;
