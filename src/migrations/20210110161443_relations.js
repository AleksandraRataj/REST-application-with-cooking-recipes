
exports.up = function(knex) {
    return knex.schema.createTable("recipes_ingredients", (table) => {
        table.increments().primary();
        table.integer('recipe_id').references('recipes.id');
        table.integer('ingredient_id').references('ingredients.id').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipes_ingredients');
};
