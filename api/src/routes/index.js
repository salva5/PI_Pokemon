const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { 
    getPokemonsHandler, 
    getDetailHandler, 
    postCreateHandler,
} = require("../handlers/pokemonHandler")
const getTypesHandler = require("../handlers/typePokemonHandler")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons/:id", getDetailHandler)
router.get("/pokemons", getPokemonsHandler)
router.post("/pokemons",postCreateHandler)
router.get("/types", getTypesHandler)

module.exports = router;
