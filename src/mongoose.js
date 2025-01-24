
const mongoose = require('mongoose')
const { Meal, MealFilter, createMeals, createMealFilters } = require('./models/meals')
const { Juice, JuiceFilter, createJuices, createJuiceFilters } = require('./models/juices')

const connectionURL = 'mongodb://127.0.0.1:27017/recipes-data'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionURL)
    console.log('Connected to database!')

    const meals = await Meal.find()
    const mealFilters = await MealFilter.find()

    const juices = await Juice.find()
    const juiceFilters = await JuiceFilter.find()
    
    await createMeals(meals)
    await createMealFilters(mealFilters)

    await createJuices(juices)
    await createJuiceFilters(juiceFilters)
  } catch (error) {
    console.log(error)
  }
}

const fetchMeals = async (type, filters) => {
  const recipes = await Meal.find({ recipeType: type })

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
      const fetchedNotNone = await MealFilter.findOne({ name: notNone })

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

    if (filtered.length !== 0) {
      filtered = filtered.filter(recipe => !notFiltered.includes(recipe))
    }
    
    return(filtered)
  }
}

const fetchJuices = async (filter) => {
  // Fetch all juice recipes and a filter
  const juices = await Juice.find()
  
  // If there is no filter return all juices
  if (filter === 'none') {
    return juices
  } else {
    const fetchedFilter = await JuiceFilter.findOne({ name: filter })
    
    const filteredJuices = juices.filter(juice => {
      return juice.ingredients.every(ingredient => 
        fetchedFilter.ingredients.every(filterIngredient => !ingredient.includes(filterIngredient))
      )
    })

    return filteredJuices
  }
}

connectToDatabase()

module.exports = { 
  fetchMeals,
  fetchJuices
}