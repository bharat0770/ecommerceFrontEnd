import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/api/order";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
const ProductCard = ({ name, quantity, price, photo }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "transaction-order-item", children: [_jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${photo}`, alt: "product image" }), _jsxs("div", { className: "order-item-info", children: [_jsx("p", { children: name }), _jsxs("p", { children: [price, " X ", quantity, " = \u20B9", price * quantity] })] })] }) }));
};
const transactionManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isError, error, isLoading } = useOrderDetailsQuery(id);
    const [updateTransaction] = useUpdateOrderMutation();
    const [deleteTransaction] = useDeleteOrderMutation();
    const defaultData = {
        shippingInfo: {
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: "",
        },
        status: "",
        subtotal: 0,
        discount: 0,
        shippingCharges: 0,
        tax: 0,
        total: 0,
        orderItems: [],
        user: { name: "", _id: "" },
        _id: "",
    };
    const { shippingInfo: { address, city, state, country, pinCode }, orderItems, user: { name }, status, tax, subTotal, total, discount, shippingCharges, } = data?.message || defaultData;
    const updateHandler = (id) => {
        // useUpdateOrderMutation(data?.message._id!);
        updateTransaction(id);
        toast.success("Order updated successfully");
        navigate("/admin/product/process");
    };
    const deleteHandler = (id) => {
        deleteTransaction(id);
        toast.success("Order deleted successfully");
        navigate("/admin/product/process");
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "transaction-management", children: [_jsx("div", { className: "orderItems", children: orderItems?.map((item, index) => (_jsx(ProductCard, { name: item.name, quantity: item.quantity, price: item.price, photo: item.photo }, index))) }), _jsxs("div", { className: "transaction-info", children: [_jsx("button", { className: "product-delete-btn", onClick: () => { deleteHandler(id); }, children: _jsx(FaTrash, {}) }), _jsx("h1", { children: "Order Info" }), _jsxs("p", { children: ["ID: ", id] }), _jsx("h5", { children: "User Info" }), _jsxs("p", { children: ["Name: ", name] }), _jsxs("p", { children: ["Address: ", `${address}, ${city}, ${state}, ${country} ${pinCode}`] }), _jsx("h5", { children: "Amount Info" }), _jsxs("p", { children: ["Subtotal: ", subTotal] }), _jsxs("p", { children: ["Shipping Charges: ", shippingCharges] }), _jsxs("p", { children: ["Tax: ", tax] }), _jsxs("p", { children: ["Discount: ", discount] }), _jsxs("p", { children: ["Total: ", total] }), _jsx("h5", { children: "Status Info" }), _jsxs("p", { children: ["Status:", " ", _jsx("span", { className: status === "delivered"
                                        ? "purple"
                                        : status === "shipped"
                                            ? "green"
                                            : "red", children: status })] }), _jsx("button", { className: "shipping-btn", onClick: () => { updateHandler(id); }, children: "Process Status" })] })] }) }));
};
export default transactionManagement;
