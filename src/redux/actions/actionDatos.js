import { typesDatos } from "../types/types";

const url = 'https://recipe-rissoto.vercel.app/recipe';

//---------------listar----------------//
export const listDatosAsyn = () => {
    return async (dispatch) => {
        const resp = await fetch(url)
        const dato = await resp.json()

        dispatch(listDatosSync(dato.ingredients))
        // console.log(dato.ingredients);
    }
}
 
export const listDatosSync = (dato) => {
    return {
        type: typesDatos.list,
        payload: dato
    }

}