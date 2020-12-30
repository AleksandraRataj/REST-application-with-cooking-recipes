const {Router} = require('express')
const recipeRouter = require('./recipes/recipe.controller')
const router = new Router();

router.use('/recipes', recipeRouter);

module.exports = router;