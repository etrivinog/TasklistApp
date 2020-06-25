import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from '../reducers';

//Esto es para el plugin de chrome redux dev tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

export const store = createStore(reducers, initialState,
                     composeEnhancer(applyMiddleware(promiseMiddleware))); 