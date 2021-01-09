//migracja tworząca tabele

exports.up = function(knex) {
    return knex.schema.createTable("measurements", (table) => {
        table.increments().primary();
        table.double("measurement").notNullable();
        table.string("unit").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};

//migracja usuwająca tabele
exports.down = function(knex) {
    return knex.schema.dropTable("measurements");
};
