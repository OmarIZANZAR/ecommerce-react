import React from 'react'
import LogoSvg from '../assets/ecommerce_logo.svg'
import IconSvg from '../assets/ecommerce_icon.svg'

const Footer = () => {
    return (
        <div style={footerStyle}>
            <div className="container" style={container}>
                <img src={IconSvg} alt="icon" style={IconStyle} />
                <img src={LogoSvg} alt="logo" style={LogoStyle}/>
            </div>
        </div>
    )
}

const footerStyle = {
    backgroundColor: 'rgb(50,50,50)',
    width: '100%',
    height: '200px',
}

const container = {
    color: '#fff',
    height: "100%",
    fontSize: '1rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const LogoStyle = {
    height: 60,
}

const IconStyle = {
    // height: 80,
}

export default Footer
