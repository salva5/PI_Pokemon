import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import styles from "./detail.module.css"

const Detail = () => {
    const [pokemon, setPokemon] = useState({})
    const {id} = useParams();
    useEffect( ()=> {
        axios(`http://localhost:3001/pokemons/${id}`)
        .then(({data}) => {
            if(data.name) setPokemon(data)
        })
        .catch((error) => console.log(error))
        return setPokemon({})
    },[id])
    const newTypes = [...new Set(pokemon.types)]
    const type = newTypes.map(el => <li key={el}>{el}</li>)      
    return (
        <div className={styles.divDetail}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <img  src={pokemon.image} alt="pokemon" />  

                </div>
                <div className={styles.info}>

                    <h3>Id: {pokemon?.id}</h3>
                    <h3>Name: {pokemon?.name}</h3>
                    <h3>HP: {pokemon?.hp}</h3>
                    <h3>Attack: {pokemon?.attack}</h3>
                    <h3>Defense: {pokemon?.defense}</h3>
                    <h3>Height: {pokemon?.height}</h3>
                    <h3>Weight: {pokemon?.weight}</h3>
                    <div className={styles.types}>

                        <h3> Type:</h3>
                        <ul >
                            {type}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Detail;