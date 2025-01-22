
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

  // Checks if there are 'none' elements in filter
  const none = filters.filter(filter => filter === 'none')

  if (none.length === 0) {
    console.log('Filters are:', filters)
    console.log('all filters are not none')
  } else if (none.length < filters.length) {
    console.log('at least one is none')

    // All filters that are not 'none'
    const notNoneFilters = filters.filter(filter => filter !== 'none')
    
    // For every filter that is not 'none'
    for (let notNone of notNoneFilters) {
      // Find the filter from database
      const fetchedNotNone = await Filter.findOne({ name: notNone })

      const filteredRecipes = recipes.filter(recipe => {
        return recipe.ingredients.every(ingredient => 
          fetchedNotNone.ingredients.every(filterIngredient => !ingredient.includes(filterIngredient))
        )
      })
      return filteredRecipes
    }
  } else {
    return recipes
  }
}

connectToDatabase()

module.exports = { fetchData }