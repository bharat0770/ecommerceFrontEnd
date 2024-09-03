import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMyOrderQuery } from "../redux/api/order";
const Orders = () => {
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    const { data, isError, error, isLoading } = useMyOrderQuery(user?._id);
    if (error) {
        const err = error;
        toast.error(err.data?.message);
    }
    return (_jsx("div", { className: "transaction", children: _jsxs("div", { className: "orderItems", children: [_jsx("h1", { children: "transactions" }), data?.message.map((order) => (_jsx(OrderCard, { id: order._id, amount: order.total, discount: order.discount, status: order.status })))] }) }));
};
const OrderCard = ({ id, amount, discount, status }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'transaction-items', children: [_jsxs("span", { children: ["orderId : ", id] }), _jsxs("span", { children: ["amount : ", amount] }), _jsxs("span", { children: ["discount : ", discount] }), _jsxs("span", { children: ["status :", _jsxs("span", { className: `${status === "processing" ? "red" : status === "shipped" ? "green" : "purple"}`, children: ["  ", status] })] })] }) }));
};
export default Orders;
