const mongoose = require('mongoose')
const { noDuplicates, removed } = require('../modelFunctions')

const recipeSchema = new mongoose.Schema({
  recipeType: {
    type: String,
    required: true 
    
  },
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions : {
    type: String,
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

const Meal = mongoose.model('Meal', recipeSchema)
const MealFilter = mongoose.model('MealFilter', filterSchema)

async function createMeals(fetchedMeals) {
  try {
    const meals = [
      {
        "recipeType": "breakfast",
        "name": "Berry Smoothie Bowl",
        "ingredients": [
          "1 cup frozen mixed berries (blueberries, raspberries, strawberries)",
          "1 frozen banana",
          "1 cup unsweetened almond milk",
          "1 tablespoon chia seeds",
          "Toppings: Fresh berries, granola, shredded coconut"
        ],
        "instructions": "Blend the frozen berries, banana, almond milk, chia seeds, and almond butter until smooth. Pour into a bowl and top with fresh berries, granola, and shredded coconut."
      },
      {
        "recipeType": "breakfast",
        "name": "Avocado Toast with Egg",
        "ingredients": [
          "1 slice whole-grain bread",
          "½ avocado, mashed",
          "1 poached or soft-boiled egg",
          "A sprinkle of chili flakes, salt, and pepper",
          "Optional: Squeeze of lemon"
        ],
        "instructions": "Toast the bread and spread the mashed avocado on top. Add the poached egg and season with chili flakes, salt, and pepper."
      },
      {
        "recipeType": "lunch",
        "name": "Grilled Chicken Salad with Avocado",
        "ingredients": [
          "1 grilled chicken breast, sliced",
          "2 cups mixed greens (spinach, arugula, kale)",
          "½ avocado, sliced",
          "1 small cucumber, sliced",
          "¼ cup cherry tomatoes, halved",
          "Dressing: Olive oil, lemon juice, salt, and pepper"
        ],
        "instructions": "Toss the greens, cucumber, and cherry tomatoes in a bowl. Add the grilled chicken and avocado on top. Drizzle with dressing."
      },
      {
        "recipeType": "dinner",
        "name": "Lentil and Spinach Curry",
        "ingredients": [
          "1 cup cooked lentils",
          "1 tablespoon olive oil",
          "1 onion, diced",
          "2 garlic cloves, minced",
          "1 teaspoon turmeric",
          "1 teaspoon cumin",
          "1 cup canned diced tomatoes",
          "2 cups fresh spinach",
          "½ cup coconut milk"
        ],
        "instructions": "Sauté the onion and garlic in olive oil until soft. Add turmeric and cumin, and cook for 1 minute. Stir in the tomatoes and simmer for 5 minutes. Add the lentils, spinach, and coconut milk, and cook until heated through."
      },
      {
        "recipeType": "dinner",
        "name": "Baked Salmon with Asparagus",
        "ingredients": [
          "1 salmon fillet",
          "1 bunch asparagus, trimmed",
          "1 tablespoon olive oil",
          "1 garlic clove, minced",
          "1 lemon, sliced",
          "Salt and pepper to taste"
        ],
        "instructions": "Preheat oven to 375°F (190°C). Place the salmon and asparagus on a baking sheet. Drizzle with olive oil, and sprinkle with garlic, salt, and pepper. Lay lemon slices on top of the salmon. Bake for 15–20 minutes, or until the salmon is cooked through."
      }
    ]

    noDuplicates(meals, fetchedMeals, Meal)
    removed(meals, fetchedMeals, Meal)

  } catch (error) {
    console.log(error)
  }
}

async function createMealFilters(fetchedFilters) {
  try {
    const mealfilters = [
      {
        "name": "vegan",
        "ingredients": [
          "egg",
          "chicken breast",
          "salmon fillet",
          "cheese",
          "butter"
        ]
      },
      {
        "name": "gluten",
        "ingredients": [
          "whole-grain bread",
          "oats",
          "wheat flour"
        ]
      },
      {
        "name": "dairy",
        "ingredients": [
          "milk",
          "butter",
          "cheese",
          "yogurt"
        ]
      },
      {
        "name": "nut",
        "ingredients": [
          "almond",
          "cashews",
          "pistachios",
          "walnuts"
        ]
      }
    ]

    noDuplicates(mealfilters, fetchedFilters, MealFilter)
    removed(mealfilters, fetchedFilters, MealFilter)

  } catch (error) {
    console.log(error)
  }
}

module.exports = { 
  Meal,
  MealFilter,
  createMeals,
  createMealFilters
}