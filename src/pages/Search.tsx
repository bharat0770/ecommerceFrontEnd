import React, { useEffect, useState } from "react";
import ProductCard from "../components/Product-card";
import { useCategoriesQuery, useSeachProductQuery } from "../redux/api/product";
import { toast } from "react-hot-toast";
import { customError } from "../types/api-types";
import { cartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
const Search = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, error } = useCategoriesQuery("");
    if (isError) {
        const err = error as customError;
        toast.error(err.data.message);
    }
    const [search, setSearch] = useState("");
    const [maxprice, setMaxPrice] = useState(100000);
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const isNextPage = page < 4;
    const isPrevPage = page > 1;
    const addToCartHandler = (cartItem: cartItem) => {
        if (cartItem.stock < 1) return toast.error("Out of stock");
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
    const {
        data: searchedproducts,
        isLoading: productsLoading,
        isError: productsError,
    } = useSeachProductQuery(searchObj);
    console.log(searchedproducts);
    if (productsError) {
        console.log(error);
        const err = error as customError;
        toast.error(err.data.message);
    }
    return (
        <div className="search-ui">
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>sort</h4>
                    <select
                        name="order"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">none</option>
                        <option value="asc">low to high</option>
                        <option value="desc">high to low</option>
                    </select>
                </div>
                <div>
                    <h4>Max Price : {maxprice || ""}</h4>
                    <input
                        type="range"
                        min={0}
                        max={100000}
                        value={maxprice}
                        onChange={(e) => {
                            setMaxPrice(Number(e.target.value));
                        }}
                    />
                </div>
                <div>
                    <h4>category</h4>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        <option value="">All</option>
                        {!isLoading &&
                            data?.message.map((i) => (
                                <option key={i} value={i}>
                                    {i.toUpperCase()}
                                </option>
                            ))}
                    </select>
                </div>
            </aside>
            <main>
                <div>
                    <h2>Products</h2>
                    <input
                        type="text"
                        value={search}
                        placeholder="Search product "
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="product-list">

                    {searchedproducts?.message.map((product) => (
                        <ProductCard
                            key={product._id}
                            productId={product._id}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            handler={addToCartHandler}
                            photo={product.photo}
                        />
                    ))}
                </div>
                {
                    searchedproducts && searchedproducts.totalPages > 1 ? (
                        <div className="pagination">
                            <button
                                className="prev"
                                disabled={!isPrevPage}
                                onClick={(e) => {
                                    setPage((prev) => prev - 1);
                                }}
                            >
                                prev
                            </button>
                            <p className="pg">
                                {page} of {4}
                            </p>
                            <button
                                className="next"
                                disabled={!isNextPage}
                                onClick={(e) => {
                                    setPage((prev) => prev + 1);
                                }}
                            >
                                next
                            </button>
                        </div>
                    ) : <div></div>
                }
            </main>
        </div>
    );
};

export default Search;
