import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/order";
import { resetCart } from "../redux/reducer/cartReducer";
const stripePromise = loadStripe("pk_test_51PnvJ4EXtISc9LPGoJl3Kals9ZKxq1EpQv0LNpWPPCSQnvzYyYE2omQvxCkkREGRB3pJYR3e1IB7jpXD05a10JTE00ayeKmGMW");
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newOrder] = useNewOrderMutation();
    const { user } = useSelector((state) => state.userReducer);
    const { cartItems, subTotal, tax, discount, shippingCharges, total, shippingInfo, } = useSelector((state) => state.cartReducer);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!elements || !stripe)
                return;
            const orderData = {
                orderItems: cartItems,
                subTotal: subTotal,
                tax: tax,
                discount: discount,
                shippingCharges: shippingCharges,
                total: total,
                shippingInfo: shippingInfo,
                user: user?._id,
            };
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: window.location.origin },
                redirect: "if_required",
            });
            if (error) {
                toast.error(error.message || "Something went wrong");
                console.error("Payment Error:", error);
                return;
            }
            if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    const res = await newOrder(orderData);
                    if (res.error) {
                        console.error("New Order Error:", res.error);
                        toast.error("Order failed");
                        return;
                    }
                    dispatch(resetCart());
                    navigate("/orders");
                }
                catch (orderError) {
                    console.error("Order Error:", orderError);
                    toast.error("Order processing failed");
                }
            }
            else {
                console.error("Payment not successful or PaymentIntent not available.");
            }
        }
        catch (err) {
            console.error("Error during submitHandler execution:", err);
            toast.error("An unexpected error occurred");
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: submitHandler, children: [_jsx(PaymentElement, {}), _jsx("button", { children: "pay" })] }) }));
};
const CheckOut = () => {
    const location = useLocation();
    const clientSecret = location.state;
    if (!clientSecret)
        return _jsx(Navigate, { to: "/shipping" });
    return (_jsx(Elements, { options: {
            clientSecret,
        }, stripe: stripePromise, children: _jsx(CheckoutForm, {}) }));
};
export default CheckOut;
