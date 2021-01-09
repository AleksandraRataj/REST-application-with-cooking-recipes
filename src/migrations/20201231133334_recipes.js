//obydwie funkcje zwracają promise - czyli są asynchroniczne

//migracja tworząca tabele
exports.up = function(knex) {
  return knex.schema.createTable("recipes", (table) => {
      table.increments().primary();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.integer("cookTime").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

//migracja usuwająca tabele
exports.down = function(knex) {
  return knex.schema.dropTable("recipes");
};
