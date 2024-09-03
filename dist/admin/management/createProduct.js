import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNewProductsMutation } from '../../redux/api/product';
const createProduct = () => {
    // taking logged user from store
    const { user, loading } = useSelector((state) => {
        return state.userReducer;
    });
    // console.log(user?.email);
    const [newProduct] = useNewProductsMutation();
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [category, setCategory] = useState("");
    const [photoPrev, setPhotoPrev] = useState("");
    const [photo, setPhoto] = useState();
    const imageHandler = (e) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof (reader.result) === "string") {
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            };
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        if (!name ||
            !price ||
            !stock ||
            !category ||
            !photo)
            return;
        formdata.set("name", name);
        formdata.set("price", price.toString());
        formdata.set("stock", stock.toString());
        formdata.set("category", category);
        formdata.set("photo", photo);
        const res = await newProduct({ email: user?.email, formdata });
        console.log(res);
    };
    return (_jsx("div", { className: 'create-product', children: _jsxs("form", { onSubmit: submitHandler, children: [_jsx("input", { type: "text", placeholder: "Enter product name", value: name, onChange: (e) => { setName(e.target.value); } }), _jsx("input", { type: "number", placeholder: "Enter product price", value: price, onChange: (e) => { setPrice(Number(e.target.value)); } }), _jsx("input", { type: "number", placeholder: "Enter product stock", value: stock, onChange: (e) => { setStock(Number(e.target.value)); } }), _jsx("input", { type: "text", placeholder: "Enter product category", value: category, onChange: (e) => { setCategory(e.target.value); } }), _jsx("input", { type: "file", onChange: imageHandler }), photoPrev && _jsx("img", { src: photoPrev, alt: "New Image" }), _jsx("button", { type: "submit", children: "Create" })] }) }));
};
export default createProduct;
