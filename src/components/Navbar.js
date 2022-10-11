import './navbar.css'
import React from 'react';
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

import LogoSvg from '../assets/ecommerce_logo.svg'
import CartClient from './cart/CartClient'

const Navbar = () => {
    const { content:cart } = useSelector(state => state.cart)
    const { pathname } = useLocation();
    const home = pathname === "/" ? "active" : ""
    const shop = pathname === "/shop" ? "active" : ""


    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={LogoSvg} style={{height: 50}} />
                    </Link>
                </div>
                
                <nav className="navbar-menu">
                    <Link to="/">
                        <p className={`navbar-menu-item ${home}`}>Home</p>
                    </Link>
                    <Link to="/shop">
                        <p className={`navbar-menu-item ${shop}`}>Shop</p>
                    </Link>
                </nav>

                <CartClient itemsCount={cart?.line_items?.length} />
            </div>
        </div>
    )
}

export default Navbar