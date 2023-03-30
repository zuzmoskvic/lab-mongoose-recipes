const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
const ScrambledEggs = {
  title: "Scrambled Eggs",
  level: "Amateur Chef",
  ingredients: "eggs",
  cuisine: "International",
  dishType: "main_course",
  duration: 15,
  creator: "Unknown",
};

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(ScrambledEggs)
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese" },
      {duration: 100},
      { new: true })
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake" }
  )})
  .finally(() => {
    return mongoose.connection.close();   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
