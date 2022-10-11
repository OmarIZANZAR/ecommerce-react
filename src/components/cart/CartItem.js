import React from 'react'

import { updateCartItem, deleteCartItem } from '../../actions/api'

const URL = process.env.REACT_APP_API_URL

const CartItem = ({item, dispatch}) => {

    return (
        <div className="cartItem-card" style={container}>
            <div style={media.container}>
                <img src={item.product.image.url} alt={item.name} style={media.image} />
            </div>

            <div style={info.container}>

                <button
                    style={removeBtn}
                    onClick={() => dispatch(deleteCartItem(item.id))}
                ><i className="far fa-trash-alt"></i></button>

                <div style={info.data}>
                    <h3>{item.name}</h3>

                    <div style={info.dataSub}>
                        <p style={info.dataTxt}>Size:</p>
                        <div style={sizeItem}>{item.size}</div>
                    </div>

                    <div style={info.dataSub}>
                        <p style={info.dataTxt}>Quantity:</p>
                        <div style={QCal}>
                            <button 
                                style={QCalbtn} 
                                onClick={() => dispatch(updateCartItem(item.id, -1))} 
                            >-</button>

                            <p>{item.quantity}</p>

                            <button 
                                style={QCalbtn} 
                                onClick={() => dispatch(updateCartItem(item.id, 1))} 
                            >+</button>
                        </div>
                    </div>
                </div>

                <div style={info.price}>
                    <p style={info.priceTxt}>{ item.quantity * item.product.price } {item.product.currency}</p>
                </div>
                
            </div>
        </div>
    )
}

const container = {
    backgroundColor: "#fafaf6" ,
    width: "100%",
    height: 120,
    padding: 7,
    margin: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}

const media = {
    container: {
        backgroundColor: "#fff",
        padding: 5,
        width: '30%',
        height: '100%',
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    }
}

const info = {
    container: {
        position: "relative",
        height: "100%",
        width: "70%",
        padding: "0 0 0 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    data: {
        width: "100%",
        flexGrow: 1,
    },
    dataSub: {
        display: "flex",
        alignItems: "center",
        margin: "2px 0",
    },
    dataTxt: {
        fontWeight: "600",
        fontSize: "1rem",
        marginRight: 10,
    },
    
    price: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    priceTxt: {
        fontSize: "1.2rem",
        fontWeight: "600",
    }
}

const QCal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 60,
    height: 30,
    // margin: "0 10px",
    backgroundColor: "#edede6",
}
const QCalbtn = {
    height: "100%",
    width: 15,
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    backgroundColor: "#edede6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const sizeItem = {
    backgroundColor: "#fafaf6",
    border: "1px solid #878787",
    color: "#878787",
    fontSize: 12,
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
}

const removeBtn = {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
}

export default CartItem
