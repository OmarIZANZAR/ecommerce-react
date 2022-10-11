import './productpage.css'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addCartItem } from '../actions/api'

const URL = process.env.REACT_APP_API_URL

const ProductPage = () => {
    console.log("LOAD PRODUCT PAGE...")

    const productsList = useSelector( state => state.products.content.data)
    const dispatch = useDispatch()
    const params = useParams()
    const Ref = useRef()

    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState({ value: null, quantity: 1 })

    useEffect(() => {
        if( productsList.length > 0 ){
            const p = productsList.find(pr => pr.slug === params.slug)
            setProduct( p )
            setSize( p.sizes[0] )
        }
    }, [productsList, setProduct, setSize])

    useEffect(() => {
        setQuantity(1)
    }, [size, setQuantity])

    const changeQuantity = (x) => {
        if( quantity + x >= 1 && quantity + x <= size.quantity )
            setQuantity(q => q + x)
    }

    const handleClick = () => {
        if( product ){
            dispatch(addCartItem( product.id, size.value, quantity ))
            setQuantity(1)
        }
    }

    return (
        <div style={container}>
            { !product ? (
                <div style={loader}>
                    <i className="fas fa-spinner" style={spinner}></i>
                </div>
            ) : (
                <div className="product-page-intro">
                    <div className="product-page-intro-thumb" ref={Ref}>
                        <img src={'http://localhost:1337' + product.image.url} alt="product thumb"/>
                    </div>

                    <div className="product-page-body">

                        <div style={data.top}>
                            <p style={data.title}>{product.name}</p>
                            <div style={data.mainView}>
                                <div
                                    style={data.description}
                                    dangerouslySetInnerHTML={{__html: product.description}}
                                ></div>
                            </div>
                        </div>

                        <div style={data.bottom}>

                            <div style={data.mainView}>
                                <h4>Choose a sizes:</h4>
                                <div style={data.view}>
                                    {product.sizes.map((s,i) => 
                                        <div 
                                        key={i}
                                        className={ s.value === size.value ? "size-item selected_size" : "size-item"}
                                        style={data.sizeItem} 
                                        onClick={() => setSize(s)}
                                        >{s.value}</div>
                                    )}
                                </div>
                            </div>

                            <div style={data.mainView}>
                                <h4>Choose a quantity:</h4>
                                <div style={data.view}>
                                    <div style={QCal}>
                                        <button style={QCalbtn} onClick={()=>changeQuantity(-1)}>-</button>
                                        <p style={QCalValue}>{quantity}</p>
                                        <button style={QCalbtn} onClick={()=>changeQuantity(+1)}>+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="product-page-body-bottom-view">
                                <div style={data.view}>
                                    <h4>Price:</h4>
                                    <p style={data.price}>{product.price} {product.currency}</p>  
                                </div>
                                <button
                                    disabled={!product}
                                    className="addToCartBtn" 
                                    onClick={() => handleClick()} 
                                >ADD TO CART</button>  
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const container = {
    minHeight: "90vh",
}

const loader = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const spinner = {
    fontSize: "3rem",
}

const data = {
    top: {
        width: "100%",
    },
    bottom: {
        width: "100%",
    },
    


    title: {
        fontSize: "3rem",
        fontWeight: "700",
    },
    price: {
        fontSize: "2rem",
        fontWeight: "600",
        margin: "0 1rem",
    },
    description: {
        fontSize: "1rem",
        fontWeight: "600"
    },
    mainView: {
        margin: "1rem 0",
    },
    view: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    sizeItem: {
        // backgroundColor: "#fafaf6",
        // border: "1px solid #878787",
        // color: "#878787",
        fontSize: "1rem",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 4,
        cursor: "pointer",
    },
}


const QCal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 80,
    height: 40,
    margin: "10px 0",
    backgroundColor: "#edede6",
}
const QCalValue = {
    fontSize: "1.2rem",
}
const QCalbtn = {
    height: "100%",
    width: 20,
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1.4rem",
    backgroundColor: "#edede6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export default ProductPage
