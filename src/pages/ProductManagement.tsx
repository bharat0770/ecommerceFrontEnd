import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductDetailsQuery } from '../redux/api/product';
import toast from 'react-hot-toast';

const  ProductManagement = () => {
        const {id} = useParams<{id:string}>();
        const {data:product, isLoading, error}  = useProductDetailsQuery(id!); 
        if(isLoading) return <div>...Loading</div>
        // console.log(product);
        if(error){
          console.log(error);
        }
        if (!product) return <div>No product found</div>;
        const {_id, photo, name, price, stock } = product.message;
  return (
    <>
    <div className="product-management">
      <div className="product-image">
        <img src={`${import.meta.env.VITE_SERVER}/uploads/${photo}`} alt="" />
      </div>
      <div className="product-info">
        <p>{name}</p>
        <p>₹{price}</p>
        <p>{stock} In stock</p>

      </div>
    </div>
    </>
  )
}
export default ProductManagement; 
