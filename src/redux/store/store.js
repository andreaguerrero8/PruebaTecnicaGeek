import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { accionesReducers } from "../reducers/accionesReducers";
import { datosReducers } from "../reducers/datosReducers";
import { loginReducers } from "../reducers/loginReducers";
import { registerReducers } from "../reducers/registerReducers";



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    login: loginReducers,
    register: registerReducers,
    acciones: accionesReducers,
    datos: datosReducers
})



export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


