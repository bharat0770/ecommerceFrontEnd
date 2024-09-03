import React, { ChangeEvent, useState } from 'react'
import { userReducerInitialState } from '../../types/reducer-types';
import { useSelector } from 'react-redux';
import { useNewProductsMutation } from '../../redux/api/product';

const createProduct = () =>  {
    // taking logged user from store
    const {user, loading} = useSelector((state: { userReducer: userReducerInitialState; }) => {
        return state.userReducer;
    });
    // console.log(user?.email);
    const [newProduct]  = useNewProductsMutation();

    const [name, setName] = useState<string>(""); 
    const [price, setPrice] = useState<number>(); 
    const [stock, setStock] = useState<number>(); 
    const [category , setCategory] = useState<string>(""); 
    const [photoPrev , setPhotoPrev] = useState<string>(""); 
    const [photo , setPhoto] = useState<File>(); 
    const imageHandler = (e : ChangeEvent<HTMLInputElement>) => {
        const file : File | undefined = e.target.files?.[0]; 
        const reader : FileReader = new  FileReader();
        if(file){
            reader.readAsDataURL(file); 
            reader.onloadend = () => {
                if(typeof(reader.result) === "string"){
                    setPhotoPrev(reader.result); 
                    setPhoto(file);
                }
            }
        }
    } 
    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const formdata = new FormData();
        if(
            !name || 
            !price || 
            !stock || 
            !category || 
            !photo  
        )return; 
        formdata.set("name", name); 
        formdata.set("price", price.toString()); 
        formdata.set("stock", stock.toString()); 
        formdata.set("category", category); 
        formdata.set("photo", photo); 
        const res = await newProduct({email:user?.email!, formdata}); 
        console.log(res); 
    }
    return (
    <div className='create-product'>
    {/* <adminSidebar/> */}
    <form onSubmit={submitHandler}>
        <input type="text" placeholder="Enter product name" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <input type="number" placeholder="Enter product price" value={price} onChange={(e) => {setPrice(Number(e.target.value))}}/>
        <input type="number" placeholder="Enter product stock" value={stock} onChange={(e) => {setStock(Number(e.target.value))}}/>
        <input type="text" placeholder="Enter product category" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
        <input type="file" onChange={imageHandler}/>
        {photoPrev && <img src={photoPrev} alt="New Image" />}
        <button type="submit">Create</button>
        </form>
    </div>
  )
}


export default createProduct;