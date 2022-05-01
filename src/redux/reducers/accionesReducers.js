import { typesAcciones } from "../types/types";

const initialState = {
    acciones: []
}

export const accionesReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesAcciones.add:
            return {
                acciones: [action.payload]
            }
        case typesAcciones.list:

            return {
                acciones: [...action.payload]
            }

        case typesAcciones.edit:
            console.log(state);
            console.log(action);
            return {
                ...state
            }

        case typesAcciones.delete:
            return {
                ...state,
                
            }

        default:
            return state
    }
}