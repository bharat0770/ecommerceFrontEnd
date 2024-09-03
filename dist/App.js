import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Loader } from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";
import { getUser } from "./redux/api/user";
import { fetchCart } from "./redux/reducer/cartReducer";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
// admin routes
const CreateProduct = lazy(() => import("./admin/management/createProduct"));
const UpdateProduct = lazy(() => import("./admin/management/updateProduct"));
const Transactions = lazy(() => import("./admin/management/transactions"));
const TransactionManagement = lazy(() => import("./admin/management/transactionManagement"));
const CustomerManagement = lazy(() => import("./admin/management/customers"));
const Dashboard = lazy(() => import("./admin/management/dashboard"));
const AllProduct = lazy(() => import("./admin/management/allProducts"));
const BarCharts = lazy(() => import("./admin/charts/BarCharts"));
const LineCharts = lazy(() => import("./admin/charts/LineCharts"));
const PieCharts = lazy(() => import("./admin/charts/PieCharts"));
// user routes
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Search = lazy(() => import("./pages/Search"));
// import { setCart } from "./redux/reducer/cartReducer";
const getCart = async (userId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/cart/getCart?userId=${userId}`);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};
function App() {
    // dispatch is a function/hook that we use to perform some action on store and selector is used to get data from store
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    let data = await getUser(String(user.email));
                    if (data?.data?.message) {
                        dispatch(userExist(data.data.message));
                        // dispatch(setCart()) // get carts by creating a middleware in redux 
                    }
                    else {
                        dispatch(userNotExist());
                    }
                }
                else {
                    dispatch(userNotExist());
                }
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getCart(user?._id);
            let cartItems = res?.data.message.cartItems;
            dispatch(fetchCart(cartItems));
        };
        fetchData();
    }, [user]);
    return loading ? (_jsx(Loader, {})) : (_jsxs(BrowserRouter, { children: [_jsx(Header, { user: user }), _jsx(Suspense, { fallback: _jsx("div", { children: "Please wait" }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "admin/product/create", element: _jsx(CreateProduct, {}) }), _jsx(Route, { path: "admin/product/update", element: _jsx(UpdateProduct, {}) }), _jsx(Route, { path: "admin/product/process", element: _jsx(Transactions, {}) }), _jsx(Route, { path: "admin/product/all", element: _jsx(AllProduct, {}) }), _jsx(Route, { path: "admin/transaction/:id", element: _jsx(TransactionManagement, {}) }), _jsx(Route, { path: "admin/customers", element: _jsx(CustomerManagement, {}) }), _jsx(Route, { path: "admin/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "admin/dashboard/bar", element: _jsx(BarCharts, {}) }), _jsx(Route, { path: "admin/dashboard/pie", element: _jsx(PieCharts, {}) }), _jsx(Route, { path: "admin/dashboard/line", element: _jsx(LineCharts, {}) }), _jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/Login", element: _jsx(ProtectedRoute, { isAuthenticated: user ? false : true, children: _jsx(Login, {}) }) }), _jsx(Route, { path: "/Search", element: _jsx(Search, {}) }), _jsx(Route, { path: "/Orders", element: _jsx(Orders, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, { isAuthenticated: user ? true : false }), children: _jsx(Route, { path: "/shipping", element: _jsx(Shipping, {}) }) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/pay", element: _jsx(CheckOut, {}) })] }) }), _jsx(Toaster, { position: "bottom-center" })] }));
}
export default App;
