const mongoose = require('mongoose')
const { Recipe, createRecipes } = require('./models')

const connectionURL = 'mongodb://127.0.0.1:27017/recipes-data'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionURL)
    console.log('Connected to database!')

    const recipes = await Recipe.find()
    
    await createRecipes(recipes)
  } catch (error) {
    console.log(error)
  }
}

const fetchData = async (type) => {
  return recipe = await Recipe.find({ recipeType: type })
}

connectToDatabase()

module.exports = { fetchData }