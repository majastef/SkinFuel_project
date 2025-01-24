const mongoose = require('mongoose')
const { noDuplicates, removed } = require('../modelFunctions')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  }
})

const filterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  }
})

const Juice = mongoose.model('Juice', recipeSchema)
const JuiceFilter = mongoose.model('JuiceFilter', filterSchema)

async function createJuices(fetchedJuices) {
  try {
    const juices = [
      {
        "name": "Glow Green Juice",
        "ingredients": [
          "1 cucumber",
          "2 stalks celery",
          "1 green apple",
          "1 handful spinach",
          "1/2 lemon (peeled)",
          "1-inch piece fresh ginger"
        ]
      },
      {
        "name": "Radiant Carrot Citrus Juice",
        "ingredients": [
          "4 carrots",
          "1 orange (peeled)",
          "1/2 lemon (peeled)",
          "1-inch piece fresh turmeric",
          "1/2 inch piece fresh ginger"
        ]
      },
      {
        "name": "Hydration Boost Watermelon Juice",
        "ingredients": [
          "2 cups watermelon (seedless)",
          "1 cucumber",
          "1/2 lime (peeled)",
          "A few fresh mint leaves"
        ]
      },
      {
        "name": "Berry Antioxidant Juice",
        "ingredients": [
          "1 cup strawberries (hulled)",
          "1/2 cup blueberries",
          "1/2 cup raspberries",
          "1/2 orange (peeled)",
          "1/2 cup coconut water"
        ]
      },
      {
        "name": "Tropical Skin Refresher",
        "ingredients": [
          "1/2 pineapple (peeled and cored)",
          "1/2 cucumber",
          "1 handful kale",
          "1/2 lime (peeled)",
          "1/2 cup coconut water"
        ]
      },
      {
        "name": "Beetroot Glow Juice",
        "ingredients": [
          "1 medium beet (peeled)",
          "2 carrots",
          "1 green apple",
          "1/2 lemon (peeled)",
          "1-inch piece fresh ginger"
        ]
      }
    ]

    noDuplicates(juices, fetchedJuices, Juice)
    removed(juices, fetchedJuices, Juice)

  } catch (error) {
    console.log(error)
  }
}

async function createJuiceFilters(fetchedFilters) {
  try {
    const juicefilters = [
      {
        "name": "citrus-free",
        "ingredients": [
          "orange",
          "lemon",
          "lime"
        ]
      },
      {
        "name": "nightshade-free",
        "ingredients": [
          "tomato",
          "bell pepper",
          "eggplant",
          "potato"
        ]
      },
      {
        "name": "ginger-free",
        "ingredients": [
          "ginger"
        ]
      }
    ]

    noDuplicates(juicefilters, fetchedFilters, JuiceFilter)
    removed(juicefilters, fetchedFilters, JuiceFilter)

  } catch (error) {
    console.log(error)
  }
}

module.exports = { 
  Juice,
  JuiceFilter,
  createJuices,
  createJuiceFilters
}