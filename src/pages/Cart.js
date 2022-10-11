import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CartClient from '../components/cart/CartClient';
import CartItem from '../components/cart/CartItem';

import { toggleCart, closeCart } from '../actions/api';

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    
    const handleClick = (e) => {
        if(e.target.classList.contains('empty'))
            dispatch(toggleCart())
    }

    return ( cart.showCart ? (
        <div style={container} onClick={handleClick} className="empty">
            <div style={mycart}>

                <div style={cartHead}>
                    <button
                        style={cartHeadBtn}
                        className=""
                        onClick={() => dispatch(closeCart())}
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <CartClient itemsCount={cart.content.line_items.length} />
                </div>

                <div style={cartBody}>
                        { cart.loading ? (
                            <div style={loader}>
                                <i className="fas fa-spinner" style={spinner}></i>
                            </div>
                        ) : (
                            cart.content.line_items.length === 0 ? (
                                <div style={empty}>
                                    <p style={emptySign}>No Products Available</p>
                                </div>
                            ) : (
                                <div style={itemsList}>
                                    {cart.content.line_items.map((item, i) => 
                                        <CartItem 
                                            key={i} 
                                            item={item} 
                                            dispatch={dispatch}
                                        />
                                    )}
                                </div>
                            )
                        )}                
          
                </div>

                <div style={checkout}>
                    <div style={total}>
                        <p style={totalTxt}>Total:</p>
                        <p style={totalValue}>
                            <span style={vl}>{cart.content.subtotal}</span> {cart.content.currency}
                        </p>
                    </div>
                    <div style={checkoutBottom}>
                        <div style={paymentsmethods}>
                            <i style={ico} className="fab fa-cc-mastercard"></i>
                            <i style={ico} className="fab fa-cc-visa"></i>
                        </div>
                        <Link to="/checkout">
                            <button 
                                className="cart-checkout-btn" 
                                disabled={cart.content.line_items.length === 0 ? true : false}
                            >
                                Checkout now
                            </button>
                        </Link>
                    </div>
                </div>
            
            </div>
        </div>
        ) : (null)
    )
}

const container = {
    backgroundColor: "rgba(0,0,0,.3)",
    width: "100%",
    height: "100%",
    position: "fixed",
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 4,
}

const mycart = {
    backgroundColor: "#fff",
    width: 440,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
}

const cartHead = {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    position: "absolute",
    top: 0,
    right: 0,
}
const cartHeadBtn = {
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
}

const cartBody = {
    width: "100%",
    height: "100%",
    paddingTop: "60px",
    paddingBottom: "125px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const itemsList = {
    padding: "1rem",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowY: "scroll",
}

const checkout = {
    backgroundColor: "#fff",
    width: "100%",
    height: "min-content",
    zIndex: 2,
    padding: "1rem",
    boxShadow: "0px -12px 10px -15px rgba(0,0,0,.4)",
    position: "absolute",
    bottom: 0,
    right: 0,
}

const total = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}

const totalTxt = {
    fontSize: "1.6rem",
    fontWeight: "300",
    color: "black",
}

const totalValue = {
    fontSize: "1.6rem",
    fontWeight: "500",
    color: "black",
    fontFamily: "'Cinzel', serif",
}

const vl = {
    fontFamily: "'Cinzel', serif",
}

const checkoutBottom = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0 0 0",
}

const paymentsmethods = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    fontSize: "2rem",
    color: "#878787"
}

const ico = {
    margin: "0px 4px",
}

const loader = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const spinner = {
    fontSize: "3rem",
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

export default Cart