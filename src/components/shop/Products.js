import './products.css'
import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ productsList, loading }) => {

    return ( loading ? (
            <div className="loader">
                <i className="fas fa-spinner"></i>
            </div>
        ) : (
            productsList.length === 0 ? (
                <div style={empty}>
                    <p style={emptySign}>No Products Available</p>
                </div>
            ) : (
                <div className="products-grid">
                    { productsList.map((product, index) =>
                        <ProductCard product={product} key={index} />
                    )}
                </div>
            )
        )
    )
}

const empty = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const emptySign = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "rgba(0,0,0,.4)",
}
export default Products;
