
const mongoose = require('mongoose')
const { Recipe, Filter, createRecipes, createFilters } = require('./models')

const connectionURL = 'mongodb://127.0.0.1:27017/recipes-data'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionURL)
    console.log('Connected to database!')

    const recipes = await Recipe.find()
    const filters = await Filter.find()
    
    await createRecipes(recipes)
    await createFilters(filters)
  } catch (error) {
    console.log(error)
  }
}

const fetchData = async (type, filters) => {
  const recipes = await Recipe.find({ recipeType: type })

  const none = filters.filter(filter => filter === 'none')

  if (none.length === 0) {
    console.log('no none el')
  } else if (none.length < filters.length) {
    console.log('at least one is none')
  } else {
    return recipes
  }
}

connectToDatabase()

module.exports = { fetchData }