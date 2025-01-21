const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'recipes-data'

const client = new MongoClient(connectionURL)

const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log('Connected to MongoDB Compass!')

    const db = client.db(databaseName)

    const collections = await db.listCollections().toArray();
    console.log(collections)

    // const recipesCollection = db.collection('recipes')
    // const recipes = await recipesCollection.find().toArray()
    // console.log(recipes)

  } catch (error) {
    console.log(error)
  }
}

connectToDatabase()