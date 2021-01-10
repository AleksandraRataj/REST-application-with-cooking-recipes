const {Model} = require('objection');
//korzystanie z połączenia za pomocą biblio knex która jest już skonfigurawana
// wczytujemy skonfigurowaną instancję obiektu knex
const knex = require('../knex');
const BaseModel = require("./base.model");

//konfigurujemy model, zainicjaliwany w ten sposób, że można go połączyć z bazą danych
Model.knex(knex);

//model - obiektowa interpretacja tabeli w bazie danych
class Measurement extends BaseModel {

    static get tableName(){
        return 'measurements';
    }

    //walidacja danych przed zapisaniem ich do bazy
    static get jsonSchema(){
        return {

            type: 'object',
            properties: {
                measurement: {type: 'double'},
                unit: {type: 'string'},
            }
        }
    }

    static get relationMappings() {
        return {
            ingredient: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./ingredient.model'),
                join: {
                    from: 'measurements.ingredient_id',
                    to: 'ingredients.id',
                }
            }
        }
    }

}

module.exports = Measurement;