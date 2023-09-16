//type-actions
import { filterTypes } from "./actions";
import {
  GET_ALL_POKEMON,
  GET_NAME_POKEMON,
  FILTER_TYPES,
  FILTER_FUENTE,
  ORDEN_ALFABETICO,
  ORDEN_ATTACK,
  PAGINATE,
  RESET,
} from "./types-actions";

const initialState = {
  allPokemon: [],
  copyAllPokemon: [],
  copyOrderPokemon: [],
  pokemonFiltered: [],
  filters:false,
  currentPage : 0
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: [...payload].splice(0,12),
        copyAllPokemon: payload,
        copyOrderPokemon: payload
      };
    case GET_NAME_POKEMON:
      return {
        ...state,
        allPokemon: payload.length > 0 ? payload.splice(0,12) : [payload],
        pokemonFiltered: payload.length > 0 ? payload : [payload],
        filters:true,
        currentPage:0
      };
    case FILTER_TYPES:
      
      return {
        ...state,
        allPokemon:
          payload !== "AllTypes"
            ? [...state.copyOrderPokemon].filter((poke) =>
                  poke.types.includes(payload)
                ).splice(0,12)
            : [...state.copyOrderPokemon].splice(0,12),
        pokemonFiltered: 
          payload !== "AllTypes"
            ? [...state.copyOrderPokemon].filter((poke) =>
                  poke.types.includes(payload)
                )
            : [...state.copyOrderPokemon],
        filters: true,
        currentPage:0
      };
    case FILTER_FUENTE:{
      let filterFuente;
      if (payload === "DB")
        filterFuente = [...state.copyOrderPokemon].filter(
          (poke) => isNaN(poke.id) === true
        );
      if (payload === "Api")
        filterFuente = [...state.copyOrderPokemon].filter(
          (poke) => !isNaN(poke.id) === true
        );
      return {
        ...state,
        allPokemon:
          payload !== "Fuentes" 
            ? [...filterFuente].splice(0,12) 
            : [...state.copyOrderPokemon].splice(0,12),
        pokemonFiltered:
          payload !== "Fuentes" 
            ? filterFuente 
            : [...state.copyOrderPokemon],
        filters: true,
        currentPage:0
      };
    }
    case ORDEN_ALFABETICO: {
      
      if(state.filters){
        const orderCopy =  payload === "A-Z"
        ? [...state.copyOrderPokemon].sort((a, b) => a.name.localeCompare(b.name))
        : payload === "Z-A" 
          ? [...state.copyOrderPokemon].sort((a, b) => b.name.localeCompare(a.name))
          : [...state.copyOrderPokemon]
        const orden = 
          payload === "A-Z"
            ? [...state.pokemonFiltered].sort((a, b) => a.name.localeCompare(b.name))
            : payload === "Z-A" 
              ? [...state.pokemonFiltered].sort((a, b) => b.name.localeCompare(a.name))
              : [...state.pokemonFiltered]
        return {
          ...state,
          allPokemon: [...orden].splice(0,12),
          pokemonFiltered: orden,
          copyOrderPokemon: [...orderCopy],
          currentPage:0
          
        };
      }
      else {

        const orden = 
          payload === "A-Z"
            ? [...state.copyOrderPokemon].sort((a, b) => a.name.localeCompare(b.name))
            : payload === "Z-A"
              ?[...state.copyOrderPokemon].sort((a, b) => b.name.localeCompare(a.name))
              : [...state.copyOrderPokemon]
        return {
          ...state,
          allPokemon: [...orden].splice(0,12),
          copyOrderPokemon: orden,
          currentPage:0
        };
      }
    }
    case ORDEN_ATTACK: {
      if(state.filters) {
        const orderCopy =  payload === "Max"
        ? [...state.copyOrderPokemon].sort((a, b) => b.attack - a.attack)
        : payload === "Min"
          ? [...state.copyOrderPokemon].sort((a, b) => a.attack - b.attack)
          : [...state.copyOrderPokemon]
        const orderAttack =
          payload === "Max"
            ? [...state.pokemonFiltered].sort((a, b) => b.attack - a.attack)
            : payload === "Min"
              ? [...state.pokemonFiltered].sort((a, b) => a.attack - b.attack)
              : [...state.pokemonFiltered]
        return {
          ...state,
          allPokemon: [...orderAttack].splice(0,12),
          pokemonFiltered: orderAttack,
          copyOrderPokemon: [...orderCopy],
          currentPage: 0
        };
      }
      else {

        const orderAttack =
          payload === "Max"
            ? [...state.copyOrderPokemon].sort((a, b) => b.attack - a.attack)
            : payload === "Min" 
              ? [...state.copyOrderPokemon].sort((a, b) => a.attack - b.attack)
              : [...state.copyOrderPokemon]

        return {
          ...state,
          allPokemon: [...orderAttack].splice(0,12),
          copyOrderPokemon: orderAttack,
          currentPage: 0
        };
      }
    }
    case PAGINATE:
      const nextPage = state.currentPage + 1
      const prevPage = state.currentPage - 1
      const firstIndex = payload === "next" ? nextPage * 12 : prevPage * 12
      if(state.filters) {
        if(payload === "next" && firstIndex >= state.pokemonFiltered.length) return state
        else if(payload === "prev" && firstIndex < 0) return state
        return{
          ...state,
          allPokemon: [...state.pokemonFiltered].splice(firstIndex, 12),
          currentPage: payload === "next" ? nextPage : prevPage 
        }
      } 

      if(payload === "next" && firstIndex >= state.copyAllPokemon.length) return state
      else if(payload === "prev" && firstIndex < 0) return state
      return{
        ...state,
        allPokemon: [...state.copyAllPokemon].splice(firstIndex, 12),
        currentPage: payload === "next" ? nextPage : prevPage 
      }
    case RESET:
      return {
        ...state,
        allPokemon: [...state.copyAllPokemon].splice(0,12),
        currentPage: 0,
        filters: false,
        pokemonFiltered:[]
      }
    
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
