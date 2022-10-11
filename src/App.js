import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import ProductPage from './pages/ProductPage';

import { getProducts, getCart, getCategories, closeCart } from './actions/api'

const App = () => {
  const dispatch = useDispatch()
  const loc = useLocation()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCart())
    dispatch(getCategories())
  },[])

  useEffect(()=>{
    window.scrollTo(0,0)
    dispatch(closeCart())
  },[loc])

  return (
      <div className="App">
        <Navbar />
        <Cart />
        <div style={mainContainer} className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/products/:slug" component={ProductPage} />
          </Switch>
        </div>
        <Footer />
      </div>
  );
}

const mainContainer = {
  paddingTop: 60,
  // paddingBottom: 60,
  minHeight: "100vh",
}

export default App;
