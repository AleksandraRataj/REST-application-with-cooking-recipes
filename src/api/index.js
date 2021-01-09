//index ma agregować poszczególne routingi
const {Router} = require('express')
const recipeRouter = require('./recipes/recipe.controller')
const ingredientRouter = require('./ingredients/ingredients.controller')

const router = new Router();

router.use('/recipes', recipeRouter);
router.use('/ingredients', ingredientRouter)

module.exports = router;