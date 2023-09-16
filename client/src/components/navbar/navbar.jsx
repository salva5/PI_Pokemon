import Search from "../search/search";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {reset} from "../../redux/actions"
import styles from "../navbar/nav.module.css"


const NavBar = () => {
    const dispatch = useDispatch()
    const handleClick = () =>{
        dispatch(reset())
    }
   
    return (
        <div className={styles.divNav}>
            <input onClick={handleClick} className= {styles.img} type="image" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"/>
            
            <NavLink style={{textDecoration: "none"}} to="/home">
                 <h3 className={styles.home} >Home</h3>
            </NavLink>
            <NavLink style={{textDecoration: "none"}} to= "/create">
                <h3 className={styles.create}>Create</h3>  
            </NavLink>
        
            <Search/>
        </div>
    )
}

export default NavBar;