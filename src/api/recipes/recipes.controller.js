//Routing - ścieżka która jest połączona z daną funkcja

const {Router} = require("express");
const Recipe = require("../../models/recipe.model");
const Ingredient = require("../../models/ingredient.model")
const User = require("../../models/user.model")
const asyncHandler = require("../asynchronous-handler");
const RecipeNotFoundException = require("../../exceptions/recipe-not-found.exception");
const IngredientNotFoundException = require("../../exceptions/ingredient-not-found.exception");
const UserNotFoundException = require("../../exceptions/user-not-found.exception");

const router = new Router();

//GET /api/recipes
router.get('/', asyncHandler(async (req, res) => {
    const recipes = await Recipe
        .query()
        .select('title', 'description',)
        .withGraphJoined('ingredients')
        .modifyGraph('ingredients', builder => builder.select('name'))

    res.send(recipes);
}));

// GET /api/recipes/2
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const recipe = await Recipe.query().findById(id);

    if (!recipe) {
        throw new RecipeNotFoundException();
    }

    res.send(recipe);
}))

// POST /api/recipes
router.post('/', asyncHandler(async (req, res) => {

    const ingredient = await Ingredient.query().findById(req.body.ingredient_id);
    if (!ingredient) throw new IngredientNotFoundException;

    const user = await User.query().findById(req.body.user_id);
    if (!user) throw new UserNotFoundException;

    const recipe = await Recipe.query().insertGraphAndFetch({
        title: req.body.title,
        description: req.body.description,
        cookTime: req.body.cookTime,
        ingredients: [{
            '#dbRef': req.body.ingredient_id
        }],
        users: {
            '#dbRef': req.body.user_id
        }
    });

    res.status(201).send(recipe);

}));

// PUT /api/recipes/2
router.put('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const updatedRecipe = await Recipe.query().patchAndFetchById(id, req.body);

    if (!updatedRecipe) {
        throw new RecipeNotFoundException();
    }

    res.send(updatedRecipe);
}));

// DELETE /api/recipes/2
router.delete('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deletedCount = await Recipe.query().deleteById(id);

    if (deletedCount === 0) {
        throw new RecipeNotFoundException();
    }

    res.status(204).end();
}));

module.exports = router;