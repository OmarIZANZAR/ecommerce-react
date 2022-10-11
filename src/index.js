import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Store from './store';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Elements stripe={stripePromise}>
        <Router>
          <App />
        </Router>
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
