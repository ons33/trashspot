//redux : npm i redux react-redux redux-devtools-extension redux-thunk

import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import Middleware from 'redux-thunk';
import Reducers from './reducers';
import thunk from 'redux-thunk';
const initialState = {recipes:[],}
const store = createStore(
    Reducers,
    initialState,
    composeWithDevTools(applyMiddleware(Middleware, thunk))
)

export default store;