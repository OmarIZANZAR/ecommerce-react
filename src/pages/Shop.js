import './shop.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Filter from '../components/shop/Filter';
import Products from '../components/shop/Products';
import Pagination from '../components/shop/Pagination';

import { getProducts } from '../actions/api';

const Shop = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [category, setCategory] = useState("")
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    const refreshShop = () => {
        setCategory("")
        setQuery("")
        dispatch(getProducts())
    }

    useEffect(()=>{
        dispatch(getProducts(category, query, 1))
    },[category, query])

    useEffect(() => {
        dispatch(getProducts(category, query, page))
    },[page])

    return ( 
        <div style={ShopContainer}>

            <div className="shop-header">
                <h3 className="shop-header-title">All products</h3>

                { category.length > 0 && (
                    <p className="shop-header-text">
                        category: <span className="shop-header-text-bolder">{category}</span>
                    </p>
                )}

                { query.length > 0 && (
                    <p className="shop-header-text">
                        search for: <span className="shop-header-text-bolder">{query}</span>
                    </p>
                )}
            </div>

            <div className="shop-body">

                <Filter
                    sort={products.sortby}
                    category={category} 
                    setCategory={setCategory} 
                    setQuery={setQuery}
                    refreshShop={refreshShop}
                />

                <div className="shop-body-products">

                    <Products productsList={products.content.data} loading={products.loading} />

                    { products.content.meta.pages_count > 0 && (
                        <Pagination productMeta={products.content.meta} page={page} setPage={setPage} />
                    )}

                </div>

            </div>

        </div>
    )
}

const ShopContainer = {
    width: "100%",
    height: "100%",
    paddingBottom: 60,
}

export default Shop
