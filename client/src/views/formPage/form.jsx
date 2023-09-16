import { useState } from "react";
import { validate } from "../../utils";
import { postPokemon } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./form.module.css"

const Form = ({types}) => {
  const dispatch = useDispatch()
  const [select , setSelect] = useState({
    select1: "",
    select2: "",
  })

  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    height: "",
    weight: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    height: "",
    weight: "",
    select1: "",
    select2: "",
  });
  
  const handleChangeSelect = (event) =>{
    setSelect({
      ...select,
      [event.target.name]: event.target.value,
    })
    validate(
      {
        ...select,
        [event.target.name]: event.target.value,
      },
      event.target.name,
      setErrors,
      errors
    );
  }
  const handleChange = (event) => {
   
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    validate(
      {
        ...inputs,
        [event.target.name]: event.target.value,
      },
      event.target.name,
      setErrors,
      errors
    );
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPokemon = {
      name: inputs.name,
      image: inputs.image,
      hp: Number(inputs.hp),
      attack: Number(inputs.attack),
      defense: Number(inputs.defense),
      height: Number(inputs.height),
      weight: Number(inputs.weight),
      type: [select.select1, select.select2]
    }
    dispatch(postPokemon(newPokemon))
    setInputs({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      height: "",
      weight: "",
    })
    setSelect({
      select1: "",
      select2: "",
    })
  };
  const disabledFn = () => {
    let disableAux = true;
    for (let inpu in inputs) {
      for (let err in errors) {
        if (errors[err] === "" && inputs[inpu] !== ""){
          if(select.select1 !== "" || select.select2 !== "") disableAux = false;
        }
        else {
          disableAux = true;
          
          break;
        }
      }
    }
    return disableAux;
  };
  
  return (
    <div className={styles.divForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>New Pokemon</h2>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Name"
          name="name"
          value={inputs.name}
        />
        {errors && <h3>{errors.name}</h3>}
        <input
          type="url"
          onChange={handleChange}
          placeholder="URL de imagen"
          name="image"
          value={inputs.image}
        />
        {errors && <h3>{errors.image}</h3>}
        <input
          type="text"
          onChange={handleChange}
          placeholder="HP"
          name="hp"
          value={inputs.hp}
        />
        {errors && <h3>{errors.hp}</h3>}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Attack"
          name="attack"
          value={inputs.attack}
        />
        {errors && <h3>{errors.attack}</h3>}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Defense"
          name="defense"
          value={inputs.defense}
        />
        {errors && <h3>{errors.defense}</h3>}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Height"
          name="height"
          value={inputs.height}
        />
        {errors && <h3>{errors.height}</h3> }
  
        <input
          type="text"
          onChange={handleChange}
          placeholder="Weight"
          name="weight"
          value={inputs.weight}
        />
        {errors && <h3>{errors.weight}</h3> }
        
        <div className={styles.containerSelect}>

          <div className={styles.divSelect}>

          
        
            <select onChange={handleChangeSelect} name="select1" value={select.select1}>
              <option value="">Tipo</option>
              {
                types.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                ))
              }
            </select>
            <select onChange={handleChangeSelect} name="select2" value={select.select2}>
              <option value="">Tipo</option>
              {
                types.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                ))
              }
            </select>
        
          </div>
            {errors && <h3>{errors.select1}</h3>}
            {errors && <h3>{errors.select2}</h3>}
        </div>
        
        <button type="submit" disabled={disabledFn()}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default Form;
