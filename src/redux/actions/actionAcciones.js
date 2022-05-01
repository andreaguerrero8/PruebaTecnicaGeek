import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { baseDato } from "../../Firebase/firebaseConfig"
import { typesAcciones } from "../types/types"

//---------------------Edit-----------//
export const editAsync = (ids, producto)=>{
    console.log(ids, producto)
    return async (dispatch)=>{
        const  colleccionTraer = collection(baseDato, "pruebaBD")
        const q = query(colleccionTraer, where("id", "==", ids))
        const traerDatosQ = await getDocs(q)
        let id
        traerDatosQ.forEach( async (docu)=>{
            id= docu.id
        })
        const documenRef = doc(baseDato, "pruebaBD", id)
       await updateDoc(documenRef, producto)
        .then(resp => {
            dispatch(editSync(producto))
            dispatch(listAsyn())
            console.log(resp)
         })       
        .catch((err) => console.log(err))
 
    }
}


export const editSync = (producto)=>{
    return{
        type: typesAcciones.edit,
        payload: producto
    }
   
}

//-------------------delete--------------------//
export const deleteAsync = (id)=>{
  
    return async (dispatch)=>{
        const  colleccionTraer = collection(baseDato , "pruebaBD")
        const q = query(colleccionTraer, where("id", "==", id))
        const traerDatosQ = await getDocs(q)
        traerDatosQ.forEach((docum =>{
            deleteDoc(doc(baseDato, "pruebaBD", docum.id))
        }))
        dispatch(deleteSync(id))
        dispatch(listAsyn())
    } 
}

export const deleteSync = (id)=>{
    return{
        type: typesAcciones.delete,
        payload: id
    }
   
}

//---------------listar----------------//
export const listAsyn =()=>{
    return async (dispatch)=>{
        const  colleccionTraer = await getDocs(collection(baseDato , "pruebaBD"))
        const producto = []
        colleccionTraer.forEach((doc)=>{
            producto.push({
                ...doc.data()
                

            })
        })
        dispatch(listSync(producto))
        
    }
}

export const listSync = (producto)=>{
    return{
        type: typesAcciones.list,
        payload: producto
    }
   
}

//-------------agregar---------------//
export const addAsync =(producto)=>{
    return(dispatch)=>{
        addDoc(collection(baseDato, "pruebaBD"), producto)
        .then(resp =>{
            dispatch(addSync(producto))
           dispatch(listAsyn())
        })
        .catch(error=>{
            console.warn(error);
        })
}
}

export const addSync =(producto)=>{
    return{
        type: typesAcciones.add,
        payload: producto
    }
}