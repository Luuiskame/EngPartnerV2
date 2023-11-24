
import styles from './searchbar.module.css'

const Searchbar = ()=>{
    return (
        <nav className={styles.connectContainer}>
                <input 
                type="search" 
                placeholder="Id here"
                />
                <button>Search</button>
        </nav>
    )
}

export default Searchbar