import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Loader } from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";
import ProductManagement from "./pages/ProductManagement";
import { getUser } from "./redux/api/user";
import { fetchCart } from "./redux/reducer/cartReducer";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { userReducerInitialState } from "./types/reducer-types";


// admin routes
const CreateProduct = lazy(() => import("./admin/management/createProduct"));
const UpdateProduct = lazy(() => import("./admin/management/updateProduct"));
const Transactions = lazy(() => import("./admin/management/transactions"));
const TransactionManagement = lazy(() => import("./admin/management/transactionManagement"));
const CustomerManagement = lazy(() => import("./admin/management/customers"));
const Dashboard = lazy(() => import("./admin/management/dashboard"));
const AllProduct = lazy(() => import("./admin/management/allProducts"));
const BarCharts  = lazy(() => import( "./admin/charts/BarCharts"));
const LineCharts  = lazy(() => import( "./admin/charts/LineCharts"));
const PieCharts  = lazy(() => import( "./admin/charts/PieCharts"));

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
  } catch (error){
    console.log(error);
  }
}


function App() {
  // dispatch is a function/hook that we use to perform some action on store and selector is used to get data from store
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => {
      return state.userReducer;
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          let data = await getUser(String(user.email));
          if (data?.data?.message) {
            dispatch(userExist(data.data.message));
            // dispatch(setCart()) // get carts by creating a middleware in redux 
          } else {
            dispatch(userNotExist());
          }
        } else {
          dispatch(userNotExist());
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        let res = await getCart(user?._id);
        let cartItems = res?.data.message.cartItems;
        dispatch(fetchCart(cartItems));
    }
    fetchData();
}, [user])

return  loading ? (
    <Loader />
  ) : (
    <BrowserRouter> 
      <Header user={user}/>
      <Suspense fallback={<div>Please wait</div>}>
        <Routes>
        {/* adminRoutes */}
        <Route path="admin/product/create" element={<CreateProduct/>}/>
        <Route path="admin/product/update" element={<UpdateProduct/>}/>
        <Route path="admin/product/process" element={<Transactions/>}/>
        <Route path="admin/product/all" element={<AllProduct/>}/>
        <Route path="admin/transaction/:id" element={<TransactionManagement/>}/>
        <Route path="admin/customers" element={<CustomerManagement/>}/>
        {/* adminDashboarRoutes */}
        <Route path="admin/dashboard" element={<Dashboard/>}/>
        <Route path="admin/dashboard/bar" element={<BarCharts/>}/>
        <Route path="admin/dashboard/pie" element={<PieCharts/>}/>
        <Route path="admin/dashboard/line" element={<LineCharts/>}/>
        {/* userRoutes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/Search" element={<Search />} />
          <Route path="/Orders" element={<Orders />} />
          <Route element={
            <ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<CheckOut />} />
          {/* <Route path="/product/:id" element={<ProductManagement />} /> */}
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
