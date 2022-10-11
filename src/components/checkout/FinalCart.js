import React from 'react'
import OrderItem from './OrderItem'

const FinalCart = ({ order }) => {
    let Subtotal = 0, Shipping = 0, Total = 0, Items = [], currency = "USD";
    
    if( order ){
        Subtotal = order.subtotal
        Shipping = order.shipping
        Total = order.total
        Items = order.line_items
        currency = order.currency
    }

    return (
        <div style={container}>
            <h3>Order details:</h3>
            { Items?.length > 0 ? (<div style={itemsList}>
                { Items.map((item, i)=> (
                    <OrderItem key={i} item={item}/>
                ))}
            </div>) : (<h3>Loading ...</h3>) }
            <div style={priceDetails}>
                <div style={block}>
                    <p>Subtotal</p>
                    <p>{Subtotal} {currency}</p>
                </div>
                <div style={block}>
                    <p>Shipping</p>
                    <p>{Shipping} {currency}</p>
                </div>
            </div>
            <div style={priceTotal}>
                <p>Total</p>
                <p>{Total} {currency}</p>
            </div>
        </div>
    )
}

const container = {
    maxWidth: 400,
    marginBottom: "3rem",
}

const priceDetails = {
    marginTop: "1rem",
    borderTop: "2px solid #840067",
    fontSize: "1rem",
    fontWeight: 600,
}
const block = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
}

const priceTotal = {
    marginTop: "1rem",
    borderTop: "2px solid #840067",
    fontSize: "2rem",
    fontWeight: 600,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
}

const itemsList = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}



export default FinalCart
