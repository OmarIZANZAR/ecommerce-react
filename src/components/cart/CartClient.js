import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleCart } from '../../actions/api'

const CartClient = ({ itemsCount }) => {
    const dispatch = useDispatch()
    
    const Styler = () => ({
        color: itemsCount > 0 ? "#840067" : "black" ,
        fontSize: '1.4rem',
    })

    return (
        <div style={Client.conatiner}>
            <button style={Client.cartBtn} onClick={() => dispatch(toggleCart())}>
                <i className="fas fa-shopping-basket" style={Styler()}></i>
                {itemsCount > 0 && <span style={Client.badge}>{itemsCount}</span>}
            </button>
        </div>
    )
}

const Client = {
    conatiner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: "relative",
        marginLeft: 6,
    },
    
    cartBtn: {
        backgroundColor: "transparent",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "30px",
        marginLeft: '10px',
        border: "none",
        cursor: "pointer",
        fontSize: "1.6rem",
        fontWeigth: "300",
    },

    badge: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#840067",
        color: "#fff",
        height: "20px",
        width: "20px",
        position: "absolute",
        right: -3,
        top: -8,
        borderRadius: "50%",
        fontSize: "14px",
        fontWeight: "400",
    }
}

export default CartClient
