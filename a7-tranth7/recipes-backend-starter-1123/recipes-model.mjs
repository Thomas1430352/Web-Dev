// Models for the recipe Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Unable to connect to server.' });
    } else  {
        console.log('Connected to database successfully.');
    }
});

// SCHEMA: Define the collection's schema.
const recipeSchema = mongoose.Schema({
	title:    { type: String, required: true },
	time:     { type: Number, required: true },
	ingredients: { type: String, required: true }
});

// Compile the model from the schema 
// by defining the collection name "recipe".
const Recipe = mongoose.model('Recipe', recipeSchema);


// CREATE model *****************************************
const createRecipe = async (title, time, ingredients) => {
    const recipe = new Recipe({ 
        title: title, 
        time: time, 
        ingredients: ingredients 
    });
    return recipe.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveRecipe = async () => {
    const query = Recipe.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveRecipeByID = async (_id) => {
    const query = Recipe.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteRecipeById = async (_id) => {
    const result = await Recipe.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateRecipe = async (_id, title, time, ingredients) => {
    const result = await Recipe.replaceOne({_id: _id }, {
        title: title,
        time: time,
        ingredients: ingredients
    });
    return { 
        _id: _id, 
        title: title,
        time: time,
        ingredients: ingredients 
    }
}

// EXPORT the variables for use in the controller file.
export { createRecipe, retrieveRecipe, retrieveRecipeByID, updateRecipe, deleteRecipeById }