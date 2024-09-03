import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProudctMutation } from '../../redux/api/product';
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { userReducerInitialState } from '../../types/reducer-types';
import { toast } from "react-hot-toast";
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
const updateProduct = () => {
    const { user, loading } = useSelector(
        (state: { userReducer: userReducerInitialState }) => {
            return state.userReducer;
        }
    );
    // const params = useParams(); 
    // const {data} = useProductDetailsQuery(params.id!); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prodId = queryParams.get('id');
    // http://localhost:5173/admin/update/product/?id=669aa37bbf5f1a8780e9258a
    
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [category, setCategory] = useState<string>("");
    const [photo, setPhoto] = useState<string>("");
    
    const [updatedname, setUpdatedName] = useState<string>("");
    const [updatedprice, setUpdatedPrice] = useState<number>(0);
    const [updatedstock, setUpdatedStock] = useState<number>();
    const [updatedcategory, setUpdatedCategory] = useState<string>("");
    const [ updatedphotoPrev, setUpdatedPhotoPrev] = useState<string>("");
    const [updatedphoto, setUpdatedPhoto] = useState<File>();
    const [deleteProduct, {isLoading : loadingDelete, isError :  errorDelete}] = useDeleteProductMutation();
    const [updateProduct ,{isLoading : loadingUpdate, isError :  errorUpdate }] = useUpdateProudctMutation();
    const { data: product } = useProductDetailsQuery(prodId!);
    
    useEffect(() => {
        setId(product?.message._id!)
        setName(product?.message.name!)
        setPrice(product?.message.price!)   
        setStock(product?.message.stock!)
        setCategory(product?.message.category!)
        setPhoto(product?.message.photo!)
        // setId(data?.message._id!)
        setUpdatedName(product?.message.name!)
        setUpdatedPrice(product?.message.price!)
        setUpdatedStock(product?.message.stock!)
        setUpdatedCategory(product?.message.category!)
        // setUpdatedPhoto(data?.message.photo!)        
    }, [product]);

    const deleteHandler = async () => {
        let res = await deleteProduct({ email: user?.email!, id: product?.message._id! });
        if ("data" in res) {
            toast.success(res.data ? res.data.message : "product deleted successfully");
        }
        if ("error" in res) {
            const err = res.error as FetchBaseQueryError;
            const { data }: any = err;
            toast.error(data.message);
        }
        setUpdatedName("");
        setUpdatedPrice(0);
        setUpdatedStock(0);
        setUpdatedCategory("");
        
        setId("");
        setName("");
        setPrice(0);
        setStock(0);
        setCategory("");
        setPhoto("");
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData(); 
        setName(updatedname);
        setPrice(updatedprice);
        setStock(updatedstock);
        setCategory(updatedcategory);
        setPhoto(updatedphotoPrev);
        setPhoto(updatedphotoPrev); 

        if(updatedname)formdata.set("name", updatedname); 
        if(updatedprice)formdata.set("price", updatedprice!.toString()); 
        if(updatedstock)formdata.set("stock", updatedstock!.toString()); 
        if(updatedcategory)formdata.set("category", updatedcategory ); 
        if(updatedphoto)formdata.set("photo", updatedphoto); 
        let res = await updateProduct({id : product?.message?._id! , email : user?.email!, formdata : formdata}); 
        if("data" in res) toast.success("Product updated successfully"); 
        if("error" in res){
            toast.error("Error while updating prodjuct"); 
        }   
    }
    const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        const reader: FileReader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof (reader.result) === "string") {
                    setUpdatedPhotoPrev(reader.result);
                    console.log("updated photo preview" + updatedphotoPrev)
                    setUpdatedPhoto(file);
                    // console.log( "updatedPhoto"+ UpdatedPhoto);
                }
            }
        }
    }
    return (
        //  <adminSidebar/>  
        <div className='update-product'>
            <div className="old-product">
                <strong>ID - {id}</strong>
                <h3>Name : {name}</h3>
                <img src={`${import.meta.env.VITE_SERVER}/uploads/${photo}`? `${import.meta.env.VITE_SERVER}/uploads/${photo}`: updatedphotoPrev} alt='product-image' />
                <h3>Price : {price}</h3>
                <h3>Category : {category}</h3>
                {stock! > 0 ? (
                    <span className="green">Stock : {stock}</span>) : (<span className="red">{stock}</span>)}
                <button className="delete-product-btn" onClick={deleteHandler}>Delete</button>
            </div>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter product name" value={updatedname} onChange={(e) => { setUpdatedName(e.target.value) }} />
                <input type="number" placeholder="Enter product price" value={updatedprice} onChange={(e) => { setUpdatedPrice(Number(e.target.value)) }} />
                <input type="number" placeholder="Enter product stock" value={updatedstock} onChange={(e) => { setUpdatedStock(Number(e.target.value)) }} />
                <input type="text" placeholder="Enter product category" value={updatedcategory} onChange={(e) => { setUpdatedCategory(e.target.value) }} />
                <input type="file" onChange={imageHandler} />
                {updatedphotoPrev && <img src={updatedphotoPrev} alt="New Image" />}
                <button type="submit">Create</button>
            </form>
        </div>
    )
}


export default updateProduct;