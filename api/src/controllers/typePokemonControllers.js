const axios = require("axios")
const { Type } = require("../db") 

module.exports = async () => {
    const {data} = await axios("https://pokeapi.co/api/v2/type")
    const typesDB = await Type.bulkCreate(data.results)
    
    return typesDB
    
}