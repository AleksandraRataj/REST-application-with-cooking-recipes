const {Model} = require('objection');
//korzystanie z połączenia za pomocą biblio knex która jest już skonfigurawana
// wczytujemy skonfigurowaną instancję obiektu knex
const knex = require('../knex');
const BaseModel = require("./base.model");

//konfigurujemy model, zainicjaliwany w ten sposób, że można go połączyć z bazą danych
Model.knex(knex);

//model - obiektowa interpretacja tabeli w bazie danych
class Recipe extends BaseModel {

    static get tableName() {
        return 'recipes';
    }

    //walidacja danych przed zapisaniem ich do bazy
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                title: {type: 'string'},
                description: {type: 'string'},
                cookTime: {type: 'integer'},
            }
        }
    }

    // chcemy połaczyć recipe z istniejącymi już ingredients
    static get relationMappings() {
        return {
            ingredients: {
                relation: Model.ManyToManyRelation,
                modelClass: require("./ingredient.model"),
                join: {
                    from: 'recipes.id',
                    to: 'ingredients.id',
                    through: {
                        from: 'recipes_ingredients.recipe_id',
                        to: 'recipes_ingredients.ingredient_id'
                    },
                },
            },
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user.model'),
                join: {
                    from: 'recipes.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Recipe;