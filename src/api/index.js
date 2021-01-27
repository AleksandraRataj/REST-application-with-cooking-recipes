//index ma agregować poszczególne routingi
const {Router} = require('express');
const recipeRouter = require('./recipes/recipes.controller');
const ingredientRouter = require('./ingredients/ingredients.controller');
const measurementRouter = require('./measurements/measurements.controller');
const usersRouter = require('./users/users.controller');

const router = new Router();

router.use('/recipes', recipeRouter);
router.use('/ingredients', ingredientRouter);
router.use('/measurements', measurementRouter);
router.use('/users', usersRouter);

router.use((req, res, next) => {
    res.status(404).send({
        message: 'Unable to find the requested route!',
    });
});

module.exports = router;