
// 1. conectar a la DB
require("../db")

// 2. acceder al modelo
const PokemonModel = require("../models/Pokemon.model.js")
const pokemonArr = require("./pokemon.json")

// 3. insertar la data en la DB
async function insertData() {

  try {

    const response = await PokemonModel.insertMany(pokemonArr)
    console.log("todo bien, pokemons agregados")

  } catch(err) {
    console.log(err)
  }

}

insertData()