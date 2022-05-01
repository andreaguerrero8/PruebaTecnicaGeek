import { typesDatos } from "../types/types";

const initialState = {
    datos: []
}

export const datosReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesDatos.list:
            return {
                datos: action.payload
            }

        default:
            return state
    }
}