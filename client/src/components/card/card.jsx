import styles from "../card/card.module.css"
const Card = ({children}) => {
    return (
        <div className={styles.divCard}>
            {children}
        </div>
    )
}

export default Card;