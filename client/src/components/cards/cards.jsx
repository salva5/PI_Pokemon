import Card from "../card/card";
import {useSelector }from "react-redux"
import { NavLink } from "react-router-dom";
import styles from "../cards/cards.module.css"

const Cards = () => {
    const allPokemon = useSelector((state)=> state.allPokemon)
    return (
        <div className={styles.divContain}>
            <div className={styles.divCards}>

                {
                    allPokemon.map(pokemon => { 
                        if(pokemon.message){
                            return <div className={styles.error}>
                                <Card key={pokemon.message}>
                                    <h3>{pokemon.message}</h3>
                                </Card>
                                
                            </div> 
                        }

                        const newTypes = [...new Set(pokemon.types)]
                     
                        return (
                            <Card key= {pokemon.id}>
                                <div className={styles.divImage}>
                                    <img src={pokemon.image} alt="pokemon" />
                                </div>
                                <div className={styles.divText}>
                                    <h3>Name: {pokemon.name}</h3>

                                    <div className={styles.divTypes}>
                                        <h3>Type: </h3>
                                        <ul style={{listStyle:"none"}}>
                                            {
                                                
                                                newTypes.map(el => <li key= {el}>{el}</li>)
                                            }
                                        </ul>
                                        

                                    </div>
                                </div>
                                <NavLink to={`/detail/${pokemon.id}`}>
                                    <button>More info</button>
                                </NavLink>
                                
                            </Card>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Cards;