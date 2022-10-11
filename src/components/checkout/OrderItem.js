import React from 'react'

const OrderItem = ({item}) => {
    return (
        <div style={container}>
            <div style={media.container}>
                <img src={item?.product.image.url} alt="sneaker" style={media.image} />
            </div>

            <div style={info.container}>
                <div style={info.data}>
                    <h3>{item.name}</h3>

                    <div style={info.dataSub} title="change size and quantity in the checkout section">
                        <p style={info.dataTxt}>Size:</p>
                        <div style={sizeItem}>{item.size}</div>
                    </div>

                    <div style={info.dataSub} title="change size and quantity in the checkout section">
                        <p style={info.dataTxt}>Quantity:</p>
                        <p>{item.quantity}</p>
                    </div>
                </div>

                <div style={info.price}>
                    <p style={info.priceTxt}>{item.product.price * item.quantity} MAD</p>
                </div>
            </div>
        </div>
    )
}
const container = {
    backgroundColor: "#fafaf6" ,
    width: "100%",
    height: 116,
    padding: 7,
    margin: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: -1,
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

export default OrderItem