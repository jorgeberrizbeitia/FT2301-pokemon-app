const express = require('express');
const app = require('../app');
const PokemonModel = require('../models/Pokemon.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET "/pokemon" => renderizar una vista solo con los nombres de los pokemon
router.get("/pokemon", (req, res, next) => {
  
  // crear la vista y probar renderizarla 

  // buscar la data en la base de datos
  PokemonModel.find()
  .then((response) => {
    console.log(response)

    res.render("pokemon/list.hbs", {
      allPokemons: response
    })

  })
  .catch((error) => {
    next(error)
  })

  // enviar la lista de pokemons a la renderizacion

  

})

module.exports = router;
