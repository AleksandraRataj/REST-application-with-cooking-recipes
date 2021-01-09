const {Router} = require("express");
const Ingredient = require("../../models/ingredient.model");
const asyncHandler = require("../asynchronous-handler");
const IngredientNotFoundException = require("../../exceptions/ingredient-not-found.exception");

const router = new Router();

//GET /api/ingredients
router.get('/', asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.query();
    res.send(ingredients);
}));

// GET /api/ingredients/2
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const ingredient = await Ingredient.query().findById(id);

    if(!ingredient) {
        throw new IngredientNotFoundException();
    }

    res.send(ingredient);
}))

// POST /api/ingredients
router.post('/', asyncHandler(async (req,res) => {
    const ingredient = await Ingredient.query().insert({
        name: req.body.name
    });
    res.status(201).send(ingredient);
}));

// PUT /api/ingredients/2
router.put('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const updatedIngredient = await Ingredient.query().patchAndFetchById(id, req.body);

    if(!updatedIngredient) {
        throw new IngredientNotFoundException();
    }

    res.send(updatedIngredient);
}));

// DELETE /api/books/2
router.delete('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const deletedCount = await Ingredient.query().deleteById(id);

    if(deletedCount === 0) {
        throw new IngredientNotFoundException();
    }

    res.status(204).end();
}));

module.exports = router;