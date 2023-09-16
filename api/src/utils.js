
const cleanPokemon = (data) => {
  if (data.name) {
    const { id, name, stats, height, sprites, weight, types } = data;
    let cleanPokemon = {
      id,
      name,
      image: sprites.other.home.front_default,
      height,
      weight,
          
    };
    stats.forEach((el) => {
      if (el.stat.name === "hp") cleanPokemon.hp = el.base_stat;
      else if (el.stat.name === "attack") cleanPokemon.attack = el.base_stat;
      else if (el.stat.name === "defense") cleanPokemon.defense = el.base_stat;
      else cleanPokemon.speed = el.base_stat;
    });
    const typesPokemon = types.map(el => el.type.name)
    cleanPokemon.types = typesPokemon;
    return cleanPokemon
  }
}
const pokemonDbStructure = (pokemonDB) => {
  if(Array.isArray(pokemonDB)) {

    return pokemonDB.map(poke => {
      return {
        id: poke.id,
        name: poke.name,
        image: poke.image,
        height: poke.height,
        weight: poke.weight,
        hp: poke.hp,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        types: poke.types.map(type => type.name)
      }
    })
  }
  return {
    id: pokemonDB.id,
    name: pokemonDB.name,
    image: pokemonDB.image,
    height: pokemonDB.height,
    weight: pokemonDB.weight,
    hp: pokemonDB.hp,
    attack: pokemonDB.attack,
    defense: pokemonDB.defense,
    speed: pokemonDB.speed,
    types: pokemonDB.types.map(type => type.name)
  }
  
}

module.exports = {
  cleanPokemon,
  pokemonDbStructure
}