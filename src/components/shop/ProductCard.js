import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCartItem } from '../../actions/api';

const URL = process.env.REACT_APP_API_URL

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    
    return (
        <div className="product-card">
            
            <Link to={`/products/${product.slug}`} >
                <div className="product-card-thumb">
                    <img src={product.image.url} alt={product.name} />
                </div>
            </Link>

            <div style={body}>
            
                <div style={info.container}>
                    <Link to={`/products/${product.slug}`} >
                        <h2>{product.name}</h2>
                    </Link>
                    
                    <div style={info.view}>
                        {product.sizes.map((size, i) => 
                            <div 
                            key={i}
                            className="size-item"
                            style={info.sizeItem} 
                            onClick={() => dispatch(addCartItem(
                                product.id, 
                                size.value,
                                1
                            ))}
                            >{size.value}</div>
                        )}
                    </div>
                </div>

                <div style={control.container}>
                    <div style={control.price}>
                        <p style={control.priceTxt}>{product.price} {product.currency}</p>
                    </div>
                    <button 
                        className="product-card-control-btn"
                        style={control.btn} 
                        title="add to cart" 
                        onClick={() => dispatch(addCartItem(
                            product.id, 
                            product.sizes[0].value, 
                            1, 
                        ))}
                    >
                        <i className="fas fa-cart-plus"></i>
                    </button>
                </div>

            </div>
        </div>
    )
}

const body = {
    width: '100%',
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}

const info = {
    container: {
        width: "100%",
    },

    view: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        margin: "4px 0",
    },

    sizeItem: {
        // backgroundColor: "#fafaf6",
        // border: "1px solid #878787",
        // color: "#878787",
        fontSize: 12,
        width: 30,
        height: 30,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 2,
        cursor: "pointer",
    },
}

const control = {
    container: {
        width: "100%",
        height: "50px",
        display: "flex",
    },

    price: {
        flexGrow: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    priceTxt: {
        fontSize: "1.5rem",
        fontWeight: "600",
    },

    btns: {
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    btn: {
        // width: "80px",
        // height: "50px",
        // border: "1px solid rgba(0,0,0,.2)",
        // marginLeft: "10px",
        // backgroundColor: "#fafaf6",
        // color: "rgba(0,0,0,.4)",
        // fontSize: "1.4rem",
        // cursor: "pointer",
    },
}

export default ProductCard
