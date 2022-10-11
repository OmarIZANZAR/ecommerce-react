import React from 'react'
import Belt from '../components/home/Belt'
import Welcome from '../components/home/Welcome'

const Home = () => {
    return (
        <div style={homeStyle} >
            <Welcome />
            <Belt />
        </div>
    )
}

const homeStyle = {
    minHeight: "100vh",
    width: "100%",
    paddingBottom: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}

export default Home
