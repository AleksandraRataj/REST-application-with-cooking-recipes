//index ma agregować poszczególne routingi
const {Router} = require('express');
const recipeRouter = require('./recipes/recipe.controller');
const ingredientRouter = require('./ingredients/ingredients.controller');
const measurementRouter = require('./measurements/measurement.controller');

const router = new Router();

router.use('/recipes', recipeRouter);
router.use('/ingredients', ingredientRouter);
router.use('/measurements', measurementRouter);

module.exports = router;