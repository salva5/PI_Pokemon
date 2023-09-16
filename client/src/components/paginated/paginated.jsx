import {useDispatch, useSelector} from "react-redux"
import { page } from "../../redux/actions"
import styles from "./paginated.module.css"

const Paginate = () => {
    const dispatch = useDispatch()

    const pagination = (event) => {
        dispatch(page(event.target.name))
    }


    return (
        <div className={styles.divPaginated}>
            <button name="prev" onClick={pagination}>Prev</button>
            
            {/* {pageNumber.map(el => 
                <button key= {el} onClick={() => {}}>{el}</button>    
            )} */}
        
            <button name="next" onClick={pagination}>Next</button>
        </div>
    )
}
export default Paginate;