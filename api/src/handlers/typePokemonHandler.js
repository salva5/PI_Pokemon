const getTypesPokemon = require("../controllers/typePokemonControllers")

const getTypesHandler = async (req, res) => {
    try {
        const response = await getTypesPokemon()
        if(response) return res.status(200).json(response)
        throw Error("no se agregaron los tipos a la db") 
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
module.exports = getTypesHandler;