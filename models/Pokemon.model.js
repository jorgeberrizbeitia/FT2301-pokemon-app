const mongoose = require("mongoose")

const pokeSchema = new mongoose.Schema({
  number: Number,
  name: {
    type: String,
    unique: true
  },
  url: String,
  type: [
    String
  ],
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`    
  timestamps: true
})

const PokemonModel = mongoose.model("Pokemon", pokeSchema)

module.exports = PokemonModel