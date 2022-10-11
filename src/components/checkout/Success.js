import React from 'react'

const Success = ({ success }) => {
    return (
        <div style={container}>
            <h2>PURCHASE SUCCESSEFUL</h2>
            <div style={infoContainer}>
                <div style={formHead}>
                    <h2>Costumer details:</h2>
                </div>
                <p>Order reference: {success.reference}</p>
                <p>Fullname: {success.customer.name}</p>
                <p>Email: {success.customer.email}</p>
                <p>Phone: {success.customer.phone}</p>
            </div>

            <div style={infoContainer}>
                <div style={formHead}>
                    <h2>Shipping details:</h2>
                </div>
                <p>Country: {success.shipping_data.address.country}</p>
                <p>Region: {success.shipping_data.address.state}</p>
                <p>Address: {success.shipping_data.address.line1} {success.shipping_data.address.postal_code}</p>
            </div>

            <div style={infoContainer}>
                <div style={formHead}>
                    <h2>Order details:</h2>
                </div>
                {success.line_items.map((item,i) => (
                    <div style={orderItem} key={i}>
                        <h4>{item.name}</h4>
                        <div style={block}>
                            <p>Price</p>
                            <p>{item.product.price * item.quantity} MAD</p>
                        </div>
                        <div style={block}>

                            <p>Size:</p>
                            <p>{item.size}</p>
                        </div>
                        <div style={block}>
                            <p>Quantity:</p>
                            <p>{item.quantity}</p>
                        </div>
                    </div>
                ))}
                <div style={priceDetails}>
                    <div style={block}>
                        <p>Subtotal</p>
                        <p>{success.subtotal} MAD</p>
                    </div>
                    <div style={block}>
                        <p>Shipping</p>
                        <p>{success.shipping} MAD</p>
                    </div>
                </div>
                <div style={priceTotal}>
                    <p>Total</p>
                    <p>{success.total} MAD</p>
                </div>
            </div>
        </div>
    )
}

const container = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "600",
    margin: "1rem",
}

const infoContainer = {
    width: "100%",
    margin: "8px",
    padding: "1rem",
    border: "1px solid rgba(0,0,0,.10)",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,.10)",
    backgroundColor: "rgb(252, 252, 252)",
}
const formHead = {
    fontSize: "1.2rem",
    fontWeight: "700",
    padding: "0 0 5px 0",
    borderBottom: "1px solid rgba(0,0,0,.10)",
    display: "flex",
    alignItems: "center",
    color: "#840067",
}

const orderItem = {
    border: "1px solid rgba(0,0,0,.10)",
    padding: 5,
    margin: 5,
}

const priceDetails = {
    marginTop: "1rem",
    borderTop: "2px solid rgb(172, 63, 33)",
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
    borderTop: "2px solid rgb(172, 63, 33)",
    fontSize: "1.6rem",
    fontWeight: 600,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
}

export default Success
