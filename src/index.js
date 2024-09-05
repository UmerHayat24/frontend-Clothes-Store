import React from 'react';
import './index.css';
import ReactDOM from 'react-dom'; 
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {applyMiddleware,combineReducers,compose, createStore} from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';



import imagePreviewReducer from "./Store/reducers/imagePreviewReducer";
import thunk from 'redux-thunk';
//import axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(imagePreviewReducer,composeEnhancers(applyMiddleware(thunk)));

const app=
    <BrowserRouter>
    <App/>
    </BrowserRouter>


ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

