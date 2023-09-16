import axios from "axios"
import { 
    GET_ALL_POKEMON, 
    GET_NAME_POKEMON, 
    FILTER_TYPES, 
    FILTER_FUENTE,
    ORDEN_ATTACK,
    ORDEN_ALFABETICO,
    PAGINATE,
    RESET,
    
} from "./types-actions";


const URL = "http://localhost:3001/pokemons"

export const getAllPokemon = () => {
    
    return async (dispatch) => {
        try {
            const { data } = await axios(URL)
            return dispatch({
                type: GET_ALL_POKEMON,
                payload: data
            })
            
        } catch (error) {
            console.log(error);
        }
    } 

}

export const getNamePokemon = (name) => {
    
    return async(dispatch) => {
        try {
            const lowerCaseName = name.toLowerCase()
            const {data} = await axios(`${URL}?name=${lowerCaseName}`)
            return dispatch({
                type:GET_NAME_POKEMON,
                payload:data
            });
                
        } catch (error) {
            return dispatch({

                type:GET_NAME_POKEMON,
                payload:{message:"No existe ese pokemon"}
            })
        }
    }
}
export const postPokemon = (newPokemon) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(URL, newPokemon)
            alert(data)
        } catch (error) {
            alert("Hubo un error")
        }
       
    }
}
export const filterTypes = (type) => {
    return {
        type: FILTER_TYPES,
        payload: type
    }
}
export const filterFuente = (fuente) => {
    return {
        type: FILTER_FUENTE,
        payload: fuente
    }
}
export const ordenAttack = (orden) => {
    return {
        type:ORDEN_ATTACK,
        payload: orden
    }
}
export const ordenAlfabetico = (orden) => {
    return {
        type:ORDEN_ALFABETICO,
        payload:orden
    }
}
//PAGINADO
export const page = (order) => {
    return {
        type: PAGINATE,
        payload: order
    }
}
export const reset = () => {
    return {
        type: RESET
    }
}