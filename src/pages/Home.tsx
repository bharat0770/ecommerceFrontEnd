import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Product-card';
import { productApi, useLatestProductQuery } from '../redux/api/product';
import { allProductResponse } from '../types/api-types';
import { cartItem, Product } from '../types/types';
import { Loader } from "../components/loader";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, updateCartAsync } from '../redux/reducer/cartReducer';
import { userReducerInitialState } from '../types/reducer-types';
import { addToCart, updateCart } from '../redux/reducer/cartReducer';
const Home = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => {
      return state.userReducer;
    }
  );
  const userId = user?._id!; 
  const dispatch = useDispatch<any>();
  const { data, isError, isLoading } = useLatestProductQuery("");
  if (isError) toast.error("Cannot fetch products");

  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock"); 
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    const {productId, quantity} = cartItem;
    dispatch(updateCart({ userId, productId, quantity,}));
  };

  return (
    <>
      <div className="home-content">
        <div className="big-image">  </div>
        <h1>latest products
          <Link className="more-link" to="/search">more</Link>
        </h1>
        <main className="home-products">
          {
            isLoading ? <Loader /> :
              data?.message && Array.isArray(data.message) && data.message.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  productId={i._id}
                  photo={i.photo}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                />
              ))
          }
        </main>
      </div>
    </>
  )
}
export default Home;