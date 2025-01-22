
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

  if (none.length === filters.length) {
    // all filters are 'none', there are no filters
    return recipes
  } else if (none.length < filters.length) {
    // at least one filter is none
    // All filters that are not 'none'
    const notNoneFilters = filters.filter(filter => filter !== 'none')

    let filtered = []
    let notFiltered = []

    // For every filter that is not 'none'
    for (let notNone of notNoneFilters) {
      // Find the filter from database
      const fetchedNotNone = await Filter.findOne({ name: notNone })

      // good recipe for filter
      const filteredRecipe = recipes.filter(recipe => {
        return recipe.ingredients.every(ingredient => 
          fetchedNotNone.ingredients.every(filterIngredient => !ingredient.includes(filterIngredient))
        )
      })

      // not good for that filter
      const notFilteredRecipe = recipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => 
          fetchedNotNone.ingredients.some(filterIngredient => ingredient.includes(filterIngredient))
        )
      })

      if (notFilteredRecipe[0] && !notFiltered.includes(notFilteredRecipe[0])) {
        notFiltered.push(notFilteredRecipe[0])
      }

      if (filteredRecipe[0] && !filtered.includes(filteredRecipe[0])) {
        filtered.push(filteredRecipe[0])
      }
    }

    console.log(notFiltered)
    console.log(filtered)

    if (filtered.length !== 0) {
      filtered = filtered.filter(recipe => !notFiltered.includes(recipe))
    }
    
    return(filtered)
  }
}

connectToDatabase()

module.exports = { fetchData }