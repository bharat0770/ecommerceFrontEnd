import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAllOrderQuery } from "../../redux/api/order";
import { customError } from "../../types/api-types";
import { userReducerInitialState } from "../../types/reducer-types";
import TransactionCard from "./components/transactionCard";
const transactionManagement = () => {
    const navigate = useNavigate();

    const { user, loading } = useSelector(
        (state: { userReducer: userReducerInitialState }) => {
            return state.userReducer;
        }
    );
    const { data, isError, error, isLoading } = useAllOrderQuery(user?.email!);
    console.log(data); 
    if (error) {
        const err = error as customError;
        toast.error(err.data?.message);
    }
    const  redirectToManagement = (id : string) => {
        // navigate("/admin/product/create"); 
        navigate(`/admin/transaction/${id}`); 
    }   
    return (
        <div className="transaction">
            <div className="orderItems">
                <h1>transactions</h1>
                {data?.message.map((order) => (
                    <TransactionCard
                    id = {order._id}
                    name = {order.user.name}
                    amount = {order.total}
                    discount = {order.discount}
                    status = {order.status}
                    handler={redirectToManagement}
                    />
                ))}
            </div>
        </div>
    );
};
export default transactionManagement;
