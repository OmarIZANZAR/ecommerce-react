import './welcome.css'
import React from 'react'
import Hero from '../../assets/hero2.jpg'

const Welcome = () => {
    return (
        <div className="welcome">
        
            <div className="welcome-thumb">
                <div className="welcome-thumb-1"></div>
                <div className="welcome-thumb-2">
                    <img src={Hero} alt="heroo" />
                </div>
            </div>

            <div className="welcome-text">
                <h1>
                    WELCOME TO THE BEST MOROCCAN SHOP TO BUY A SHOE
                </h1>
                <ul>
                    <li>fast delevery</li>
                    <li>best prices</li>
                    <li>variety of products</li>
                </ul>
            </div>

        </div>
    )
}

export default Welcome
