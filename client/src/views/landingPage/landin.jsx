import style from "./landingPage.module.css"
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className={style.divLanding}>
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon" />
            
            <button onClick={()=> navigate("/home")}>Ingresar</button>
        </div>
    )
}

export default Landing;