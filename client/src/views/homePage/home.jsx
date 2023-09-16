
import Cards from "../../components/cards/cards";
import Paginate from "../../components/paginated/paginated";
import { useDispatch } from "react-redux";
import { 
    filterTypes,
    filterFuente,
    ordenAttack,
    ordenAlfabetico,
} from "../../redux/actions";
import styles from "./home.module.css"

const Home = ({types}) => {

    const dispatch = useDispatch()
    
    const handleFilterType = (event) => { 
        dispatch(filterTypes(event.target.value))
    }
    const handleFilterFuente = (event) => {
        dispatch(filterFuente(event.target.value))
    } 
    const handleOrderAttack = (event) =>  {
        dispatch(ordenAttack(event.target.value))
    }
    const handleOrderAlfabetico = (event) => {
        dispatch(ordenAlfabetico(event.target.value))
    }

    return (
        
        <div className={styles.divHome}>
            <div className={styles.divSelect}>
                <div className={styles.divFilters}>
                    <label htmlFor="filtros">Filtrar por:</label>
                    <select id="filtros" onChange={handleFilterType}>
                        <option value="AllTypes">Types</option>
                        {
                            types.map((type) => (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>
                    
                
                
                    
                    <select id="filtros" onChange={handleFilterFuente}>
                        <option  value="Fuentes">Fuentes</option>
                        <option value="DB">DB</option>
                        <option value="Api">Api</option>
                    </select>
                </div>
                <div className={styles.divOrder}>

                    <label htmlFor="orden">Ordenar por:</label>
                    <select id="orden" onChange={handleOrderAlfabetico}>
                        <option value="">Nombre</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                
                
                    <select id="orden" onChange={handleOrderAttack}>
                        <option value="">Attack</option>
                        <option value="Max">Max-Min</option>
                        <option value="Min">Min-Max</option>
                    </select>

                </div>

            </div>
            <Paginate/>
            <Cards/>
            
        </div>
    )
}

export default Home;