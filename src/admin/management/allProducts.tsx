import React from 'react'
import { useSelector } from 'react-redux';
import { userReducerInitialState } from '../../types/reducer-types';
import { useAllProductQuery } from '../../redux/api/product';
import { useNavigate } from 'react-router-dom';


const AllProductCard = ({id, name, photo, price, stock, category}) => {
    const navigate = useNavigate(); 
  return (<>
            <img src={`${import.meta.env.VITE_SERVER}/uploads/${photo}`} alt="product image" />
            <span>productId : {id}</span>
            <span>name : {name}</span>
            <span>price : {price}</span>
            <span>stock : {stock}</span>
            <span>category : {category}</span>
            <span>
                <button className="product-manage" onClick={() => {navigate(`/admin/product/update/?id=${id}`)}}>manage</button>
            </span>
  </>)
}

const allProducts = () => {
    const {user} = useSelector((state : {userReducer : userReducerInitialState}) => state.userReducer)
    const {data} = useAllProductQuery(user?.email!); 
    console.log(data); 
    return (
    <>
      <div className="all-products">
    {
      data?.message.map((e) => (
        <div className="all-products-item">
        <AllProductCard
        id = {e._id}
        name = {e.name}
        photo = {e.photo}
        price = {e.price}
        stock = {e.stock}
        category = {e.category}
        />
        </div>
      ))  
    }
    </div>
    </>
  )
}


export default  allProducts; 