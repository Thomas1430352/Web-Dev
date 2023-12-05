// Controllers for the recipe Collection

import 'dotenv/config';
import express from 'express';
import * as recipes from './recipes-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/recipes', (req,res) => { 
    recipes.createRecipe(
        req.body.title, 
        req.body.time, 
        req.body.ingredients
        )
        .then(recipe => {
            console.log(`"${recipe.title}" was logged succesfully.`);
            res.status(201).json(recipe);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unable to cook recipe.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/recipes', (req, res) => {
    recipes.retrieveRecipe()
        .then(recipes => { 
            if (recipes !== null) {
                console.log(`All recipes were retrieved from the archives.`);
                res.json(recipes);
            } else {
                res.status(404).json({ Error: 'No recipes found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'We do not get to cook right now.' });
        });
});


// RETRIEVE by ID controller
app.get('/recipes/:_id', (req, res) => {
    recipes.retrieveRecipeByID(req.params._id)
    .then(recipe => { 
        if (recipe !== null) {
            console.log(`"${recipe.title}" was retrieved, based on its ID.`);
            res.json(recipe);
        } else {
            res.status(404).json({ Error: 'You forgot the recipe ID.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Guess no food today.' });
    });

});


// UPDATE controller ************************************
app.put('/recipes/:_id', (req, res) => {
    recipes.updateRecipe(
        req.params._id, 
        req.body.title, 
        req.body.time, 
        req.body.ingredients
    )
    .then(recipe => {
        console.log(`"${recipe.title}" was updated by a chef.`);
        res.json(recipe);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'The current recipe is fine as it is.' });
    });
});


// DELETE Controller ******************************
app.delete('/recipes/:_id', (req, res) => {
    recipes.deleteRecipeById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} recipe was deleted.`);
                res.status(200).send({ Success: 'That recipe was not a good one.' });
            } else {
                res.status(404).json({ Error: 'That recipe was not a good one.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'That recipe was not a good one.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});