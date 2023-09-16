export const validate = (state, name, setErrors, errors) => {
  switch (name) {
    case "name": {
      if(!state.name) 
      return setErrors({...errors, name:"Name es requerido"})
      if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(state.name)) 
        return setErrors({ ...errors, name: "Name invalido" });

      if (state.name.length > 12) 
        return setErrors({ ...errors, name: "Max 12 caracteres" });

      return setErrors({ ...errors, name: "" });
    }
    case "image":{
      if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(state.image)) 
        return setErrors({ ...errors, image: "URL invalida" });
      
      return setErrors({...errors, image: ""})
      
    }
    case "hp": {
      if(!state.hp) 
        return setErrors({...errors, hp:"Hp es requerido"})

      if(isNaN(state.hp)) 
        return setErrors({...errors, hp:"Hp invalido"})
      if(state.hp > 300) 
        return setErrors({...errors, hp : "Max 300"})

      return setErrors({...errors, hp: ""})
    }
    case "attack": {
      if(!state.attack) 
        return setErrors({...errors, attack : "Attack es requerido"})
      
      if(isNaN(state.attack)) 
        return setErrors({...errors, attack : "Attack invalido"})
      if(state.attack > 800) 
        return setErrors({...errors, attack : "Max 800"})
      
      return setErrors({...errors, attack: ""})
    }
    case "defense":{
      if(!state.defense) 
        return setErrors({...errors, defense : "Defense es requerido"}) 
      
      if(isNaN(state.defense)) 
        return setErrors({...errors, defense : "Defense invalido" })
      if(state.defense > 800) 
        return setErrors({...errors, defense : "Max 800"})
      
      return setErrors({...errors, defense: ""})
    }
    case "height": {
      if(!state.height) 
        return setErrors({...errors, height :"Height es requerido"})
      
      if(isNaN(state.height)) 
        return setErrors({...errors, height : "Height invalido"}) 
      if(state.height > 1000) 
        return setErrors({...errors, height : "Max 1000"})
      
      return setErrors({...errors, height: ""})
    }
    case "weight":{
      if(!state.weight) 
        return setErrors({...errors, weight :"Weight es requerido" })
      
      if(isNaN(state.weight)) 
        return setErrors({...errors, weight : "Weight invalido"})
      if(state.weight > 2000) 
        return setErrors({...errors, weight : "Max 2000"})
      
      return setErrors({...errors, weight: ""})
    }
    case "select2": {
      if(!state.select2 && !state.select1)
        return setErrors({...errors, select2: "Elige al menos un tipo"})
      if(state.select2 === state.select1) 
        return setErrors({...errors, select2: "No puedes seleccionar el mismo tipo"})
      
      return setErrors({...errors, select2:"", select1:""})
      
    }
    case "select1":{
      if(!state.select1 && !state.select2)
        return setErrors({...errors, select1: "Elige al menos un tipo"})
      if(state.select1 === state.select2 ) 
        return setErrors({...errors, select1: "No puedes seleccionar el mismo tipo"})
        
      return setErrors({...errors, select1:"", select2:""})
    }

    default: {
      return {...errors}
    }
  }
};
