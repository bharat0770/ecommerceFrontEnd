import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProudctMutation } from '../../redux/api/product';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
const updateProduct = () => {
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    // const params = useParams(); 
    // const {data} = useProductDetailsQuery(params.id!); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prodId = queryParams.get('id');
    // http://localhost:5173/admin/update/product/?id=669aa37bbf5f1a8780e9258a
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [updatedname, setUpdatedName] = useState("");
    const [updatedprice, setUpdatedPrice] = useState(0);
    const [updatedstock, setUpdatedStock] = useState();
    const [updatedcategory, setUpdatedCategory] = useState("");
    const [updatedphotoPrev, setUpdatedPhotoPrev] = useState("");
    const [updatedphoto, setUpdatedPhoto] = useState();
    const [deleteProduct, { isLoading: loadingDelete, isError: errorDelete }] = useDeleteProductMutation();
    const [updateProduct, { isLoading: loadingUpdate, isError: errorUpdate }] = useUpdateProudctMutation();
    const { data: product } = useProductDetailsQuery(prodId);
    useEffect(() => {
        setId(product?.message._id);
        setName(product?.message.name);
        setPrice(product?.message.price);
        setStock(product?.message.stock);
        setCategory(product?.message.category);
        setPhoto(product?.message.photo);
        // setId(data?.message._id!)
        setUpdatedName(product?.message.name);
        setUpdatedPrice(product?.message.price);
        setUpdatedStock(product?.message.stock);
        setUpdatedCategory(product?.message.category);
        // setUpdatedPhoto(data?.message.photo!)        
    }, [product]);
    const deleteHandler = async () => {
        let res = await deleteProduct({ email: user?.email, id: product?.message._id });
        if ("data" in res) {
            toast.success(res.data ? res.data.message : "product deleted successfully");
        }
        if ("error" in res) {
            const err = res.error;
            const { data } = err;
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
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        setName(updatedname);
        setPrice(updatedprice);
        setStock(updatedstock);
        setCategory(updatedcategory);
        setPhoto(updatedphotoPrev);
        setPhoto(updatedphotoPrev);
        if (updatedname)
            formdata.set("name", updatedname);
        if (updatedprice)
            formdata.set("price", updatedprice.toString());
        if (updatedstock)
            formdata.set("stock", updatedstock.toString());
        if (updatedcategory)
            formdata.set("category", updatedcategory);
        if (updatedphoto)
            formdata.set("photo", updatedphoto);
        let res = await updateProduct({ id: product?.message?._id, email: user?.email, formdata: formdata });
        if ("data" in res)
            toast.success("Product updated successfully");
        if ("error" in res) {
            toast.error("Error while updating prodjuct");
        }
    };
    const imageHandler = (e) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof (reader.result) === "string") {
                    setUpdatedPhotoPrev(reader.result);
                    console.log("updated photo preview" + updatedphotoPrev);
                    setUpdatedPhoto(file);
                    // console.log( "updatedPhoto"+ UpdatedPhoto);
                }
            };
        }
    };
    return (
    //  <adminSidebar/>  
    _jsxs("div", { className: 'update-product', children: [_jsxs("div", { className: "old-product", children: [_jsxs("strong", { children: ["ID - ", id] }), _jsxs("h3", { children: ["Name : ", name] }), _jsx("img", { src: `${import.meta.env.VITE_SERVER}/uploads/${photo}` ? `${import.meta.env.VITE_SERVER}/uploads/${photo}` : updatedphotoPrev, alt: 'product-image' }), _jsxs("h3", { children: ["Price : ", price] }), _jsxs("h3", { children: ["Category : ", category] }), stock > 0 ? (_jsxs("span", { className: "green", children: ["Stock : ", stock] })) : (_jsx("span", { className: "red", children: stock })), _jsx("button", { className: "delete-product-btn", onClick: deleteHandler, children: "Delete" })] }), _jsxs("form", { onSubmit: submitHandler, children: [_jsx("input", { type: "text", placeholder: "Enter product name", value: updatedname, onChange: (e) => { setUpdatedName(e.target.value); } }), _jsx("input", { type: "number", placeholder: "Enter product price", value: updatedprice, onChange: (e) => { setUpdatedPrice(Number(e.target.value)); } }), _jsx("input", { type: "number", placeholder: "Enter product stock", value: updatedstock, onChange: (e) => { setUpdatedStock(Number(e.target.value)); } }), _jsx("input", { type: "text", placeholder: "Enter product category", value: updatedcategory, onChange: (e) => { setUpdatedCategory(e.target.value); } }), _jsx("input", { type: "file", onChange: imageHandler }), updatedphotoPrev && _jsx("img", { src: updatedphotoPrev, alt: "New Image" }), _jsx("button", { type: "submit", children: "Create" })] })] }));
};
export default updateProduct;
