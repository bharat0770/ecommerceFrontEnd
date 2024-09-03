import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAllOrderQuery } from "../../redux/api/order";
import TransactionCard from "./components/transactionCard";
const transactionManagement = () => {
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    const { data, isError, error, isLoading } = useAllOrderQuery(user?.email);
    console.log(data);
    if (error) {
        const err = error;
        toast.error(err.data?.message);
    }
    const redirectToManagement = (id) => {
        // navigate("/admin/product/create"); 
        navigate(`/admin/transaction/${id}`);
    };
    return (_jsx("div", { className: "transaction", children: _jsxs("div", { className: "orderItems", children: [_jsx("h1", { children: "transactions" }), data?.message.map((order) => (_jsx(TransactionCard, { id: order._id, name: order.user.name, amount: order.total, discount: order.discount, status: order.status, handler: redirectToManagement })))] }) }));
};
export default transactionManagement;
