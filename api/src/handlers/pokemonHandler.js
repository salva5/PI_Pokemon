const {
  createPokemonDB,
  getPokemonById,
  getAllPokemon,
  getPokemonByName
} = require("../controllers/pokemonControllers");

const getPokemonsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if(name) {
      const response = await getPokemonByName(name)
      if(response) return res.status(200).json(response)
      res.status(404).send("No existe ese Pokémon")

    }
    const response = await getAllPokemon();
    if(response)return res.status(200).json(response)
    throw Error("error en obtener pokemones")
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await getPokemonById(id);
    if(response) return res.status(200).json(response);   
    throw Error("no se obtuvo el pokemon por id")
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const postCreateHandler = async (req, res) => {
  try {
    const {name, image, hp, attack, defense, speed, height, weight, type } = req.body;

    const response  = await createPokemonDB(name, image, hp, attack, defense, speed, height, weight, type);
    if(response) return res.status(200).send("Pokemon Creado");

    throw Error("No se pudo crear el pokemon")
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getPokemonsHandler,
  getDetailHandler,
  postCreateHandler,
};
