import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ProductCard from "../components/Product-card";
import { useCategoriesQuery, useSeachProductQuery } from "../redux/api/product";
import { toast } from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
const Search = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, error } = useCategoriesQuery("");
    if (isError) {
        const err = error;
        toast.error(err.data.message);
    }
    const [search, setSearch] = useState("");
    const [maxprice, setMaxPrice] = useState(100000);
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const isNextPage = page < 4;
    const isPrevPage = page > 1;
    const addToCartHandler = (cartItem) => {
        if (cartItem.stock < 1)
            return toast.error("Out of stock");
        dispatch(addToCart(cartItem));
        toast.success("Added to cart");
    };
    let searchObj = {
        search: search,
        price: maxprice,
        category: category,
        sort: sort,
        page: page,
    };
    const { data: searchedproducts, isLoading: productsLoading, isError: productsError, } = useSeachProductQuery(searchObj);
    console.log(searchedproducts);
    if (productsError) {
        console.log(error);
        const err = error;
        toast.error(err.data.message);
    }
    return (_jsxs("div", { className: "search-ui", children: [_jsxs("aside", { children: [_jsx("h2", { children: "Filters" }), _jsxs("div", { children: [_jsx("h4", { children: "sort" }), _jsxs("select", { name: "order", value: sort, onChange: (e) => setSort(e.target.value), children: [_jsx("option", { value: "", children: "none" }), _jsx("option", { value: "asc", children: "low to high" }), _jsx("option", { value: "desc", children: "high to low" })] })] }), _jsxs("div", { children: [_jsxs("h4", { children: ["Max Price : ", maxprice || ""] }), _jsx("input", { type: "range", min: 0, max: 100000, value: maxprice, onChange: (e) => {
                                    setMaxPrice(Number(e.target.value));
                                } })] }), _jsxs("div", { children: [_jsx("h4", { children: "category" }), _jsxs("select", { name: "category", value: category, onChange: (e) => {
                                    setCategory(e.target.value);
                                }, children: [_jsx("option", { value: "", children: "All" }), !isLoading &&
                                        data?.message.map((i) => (_jsx("option", { value: i, children: i.toUpperCase() }, i)))] })] })] }), _jsxs("main", { children: [_jsxs("div", { children: [_jsx("h2", { children: "Products" }), _jsx("input", { type: "text", value: search, placeholder: "Search product ", onChange: (e) => setSearch(e.target.value) })] }), _jsx("div", { className: "product-list", children: searchedproducts?.message.map((product) => (_jsx(ProductCard, { productId: product._id, name: product.name, price: product.price, stock: product.stock, handler: addToCartHandler, photo: product.photo }, product._id))) }), searchedproducts && searchedproducts.totalPages > 1 ? (_jsxs("div", { className: "pagination", children: [_jsx("button", { className: "prev", disabled: !isPrevPage, onClick: (e) => {
                                    setPage((prev) => prev - 1);
                                }, children: "prev" }), _jsxs("p", { className: "pg", children: [page, " of ", 4] }), _jsx("button", { className: "next", disabled: !isNextPage, onClick: (e) => {
                                    setPage((prev) => prev + 1);
                                }, children: "next" })] })) : _jsx("div", {})] })] }));
};
export default Search;
