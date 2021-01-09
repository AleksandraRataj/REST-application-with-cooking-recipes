class IngredientNotFoundException extends Error {
    constructor(message) {
        super(message || "Ingredient not found!");
        this.status = 404;
    }
}

module.exports = IngredientNotFoundException;