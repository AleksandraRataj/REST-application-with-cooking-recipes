class RecipeNotFoundException extends Error {
    constructor(message) {
        super(message || "Recipe not found!");
        this.status = 404;
    }
}

module.exports = RecipeNotFoundException;