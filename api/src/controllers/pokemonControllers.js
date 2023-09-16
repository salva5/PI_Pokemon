const { Pokemon, Type } = require("../db");
const{ cleanPokemon, pokemonDbStructure }= require("../utils")
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemon = async () => {
  const allPokemonDB = await Pokemon.findAll({
    include:{
      model: Type,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }
  })
  
  const newAllPokemonDB = pokemonDbStructure(allPokemonDB)
  
  const { data } = await axios(`${URL}?limit=200`);
  const { results } = data;
  if (results) {
    const promises = results.map(async (item) => {
      return await getPokemonByName(item.name)
     
      
    });
    if (promises) {
      const resolvePromise = await Promise.all(promises);
      if (resolvePromise) {
        return [ ...newAllPokemonDB,...resolvePromise];
      }
    }
  }
};

const getPokemonByName = async (name) => {
  const pokemonNameDB = await Pokemon.findOne({where:{name},
    include: {
      model: Type,
      attributes: ["name"],
      through: {attributes: []}
    }
  })
  if(pokemonNameDB){
    return pokemonDbStructure(pokemonNameDB)
  }
  
  const { data } = await axios(`${URL}/${name}`)
    
  const pokemonNameApi = cleanPokemon(data)
  return pokemonNameApi;

  

};
const getPokemonById = async (id) => {
  if (!isNaN(id)) {
    const { data } = await axios(`${URL}/${id}`);
    const pokemonIdApi = cleanPokemon(data)
    return pokemonIdApi
  }
  const pokemonIdDB = await Pokemon.findByPk(id,{
    include: {
      model: Type,
      attributes: ["name"],
      through: {attributes: []}
    }
  })
  if(pokemonIdDB){
    return pokemonDbStructure(pokemonIdDB)
  }
 
};

const createPokemonDB = async (name, image, hp, attack, defense, speed, height, weight, type) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight
  });
  type.forEach(async (element) => {
    const tipoDB = await Type.findAll({where:{name:element}})
    newPokemon.addType(tipoDB)
  });
  return newPokemon;
};

module.exports = {
  getAllPokemon,
  getPokemonByName,
  getPokemonById,
  createPokemonDB,
};
