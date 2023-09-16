import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/actions";
import styles from './search.module.css';

const Search = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault();
    dispatch(getNamePokemon(name));
  };

  return (
    <form onSubmit={onSearch} className={styles.search}>
      <input type="search" onChange={handleChange} value={name} />
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
      </button>
    </form>
  );
};

export default Search;
