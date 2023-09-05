const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// create 
router.post('/add', recipeController.createRecipe);

// get
router.get('/get/:_id', recipeController.getRecipeById);

// getAll
router.get('/getall', recipeController.getAllRecipes);

// update 
router.put('/update/:_id', recipeController.updateRecipe);

//delete
router.delete('/delete/:_id', recipeController.deleteRecipe);

//picture
router.put('/uploadImageRecipe/:_id', recipeController.uploadImageRecipe);
//updatepic
router.put('/updatePicture/:id', recipeController.updateRecipPic);

router.get('/:ingredient', recipeController.getRecipesByIngredient);

router.post('/get/:id/rate', recipeController.rateRecipe);


module.exports = router;
