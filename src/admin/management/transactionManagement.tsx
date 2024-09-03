import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/api/order";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

type props = {
    name: string;
    quantity: number;
    price: number;
    photo: string;
};

const ProductCard = ({ name, quantity, price, photo }: props) => {
    return (
        <>
            <div className="transaction-order-item">
                <img
                    src={`${import.meta.env.VITE_SERVER}/uploads/${photo}`}
                    alt="product image"
                />
                <div className="order-item-info">
                <p>{name}</p>
                <p>
                    {price} X {quantity} = ₹{price * quantity}
                </p>
                </div>
            </div>
        </>
    );
};

const transactionManagement = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { data, isError, error, isLoading } = useOrderDetailsQuery(id!);
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
    const {
        shippingInfo: { address, city, state, country, pinCode },
        orderItems,
        user: { name },
        status,
        tax,
        subTotal,
        total,
        discount,
        shippingCharges,
    } = data?.message! || defaultData;
    const updateHandler = (id) => {
        // useUpdateOrderMutation(data?.message._id!);
        updateTransaction(id);
        toast.success("Order updated successfully");
        navigate("/admin/product/process")
    };
    const deleteHandler = (id) => {
        deleteTransaction(id); 
        toast.success("Order deleted successfully");
        navigate("/admin/product/process")
    };
    return (
        <>
            <div className="transaction-management">
                <div className="orderItems">
                    {orderItems?.map((item: any, index: number) => (
                        <ProductCard
                            key={index}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            photo={item.photo}
                        />
                    ))}
                </div>
                <div className="transaction-info">
                    <button className="product-delete-btn" onClick={() => {deleteHandler(id)}}>
                        <FaTrash />
                    </button>
                    <h1>Order Info</h1>
                    <p>ID: {id}</p>

                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>
                        Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                    </p>
                    <h5>Amount Info</h5>
                    <p>Subtotal: {subTotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>

                    <h5>Status Info</h5>
                    <p>
                        Status:{" "}
                        <span
                            className={
                                status === "delivered"
                                    ? "purple"
                                    : status === "shipped"
                                        ? "green"
                                        : "red"
                            }
                        >
                            {status}
                        </span>
                    </p>
                    <button className="shipping-btn" onClick={() => {updateHandler(id)}}>
                        Process Status
                    </button>
                </div>
            </div>
        </>
    );
};

export default transactionManagement;
