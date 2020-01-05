import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import News from './components/News'
import CoinDetail from './components/CoinDetail';
import Dashboard from './components/Dashboard';
import Crypttalks from './components/Crypttalks';
import PricingPage from './components/pricingPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import authGuard from './components/authGuard';
import Pricing from './components/pricing/pricing';
const middlewares = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middlewares));



ReactDOM.render(<Provider store={store}>
                    <Router>
                        <Route exact path="/" component={App} />
                        <Route path="/news" component={News} />
                        <Route path="/coin/:symbol" component={CoinDetail} />
                        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
                        <Route path="/crypttalks" component={Crypttalks} />
                        <Route path="/pricing" component={Pricing} />

                    </Router>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
