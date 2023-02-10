const express = require('express');
const app = require('../app');
const PokemonModel = require('../models/Pokemon.model');
const router = express.Router();
const capitalize = require("../utils/capitalize.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET "/pokemon" => renderizar una vista solo con los nombres de los pokemon
router.get("/pokemon", (req, res, next) => {
  
  // crear la vista y probar renderizarla 

  // buscar la data en la base de datos
  PokemonModel.find()
  .select("name") // esto es decir: solo devuelve el nombre de los pokemon
  .then((response) => {
    
    // a veces el sistema pide que hagamos un clone de response antes de modificarlo

    response.forEach((eachPokemon) => {
      eachPokemon.name = capitalize(eachPokemon.name)
    })
    // console.log(response)
    // const response2 = response.map((eachPokemon) => {
    //   return {
    //     _id: eachPokemon._id,
    //     name: capitalize(eachPokemon.name)
    //   }
    // })

    res.render("pokemon/list.hbs", {
      allPokemons: response
    })

  })
  .catch((error) => {
    next(error)
  })

  // enviar la lista de pokemons a la renderizacion

  

})

// GET "/pokemon/:pokemonId" => renderizar los detalles de un solo pokemon por su id
router.get("/pokemon/:pokemonId", (req, res, next) => {
  // 1. hacemos hbs y probamos renderizar

  // necesitamos el id
  console.log(req.params.pokemonId)
  const { pokemonId } = req.params

  // necesitamos buscar el pokemon en la DB ya teniendo el id
  // PokemonModel.findOne({_id: pokemonId})
  PokemonModel.findById(pokemonId) // son metodos más optimizados (busquedas más rapidos)
  .then((response) => {
    console.log(response)

    // pasariamos la data a la vista para renderizarla
    
    res.render("pokemon/details.hbs", {
      onePokemon: response
    })
  })
  .catch((err) => {
    next(err)
  })
})

// GET "/search" => renderizar un formulario de busqueda de pokemons
router.get("/search", (req, res, next) => {

  console.log("probando en la ruta")
  console.log(req.query)
  const { pokemon } = req.query

  PokemonModel.findOne({name: pokemon})
  .then((response) => {
    console.log(response)

    res.render("pokemon/search.hbs", {
      foundPokemon: response
    })

  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
