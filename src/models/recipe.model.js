const {Model} = require('objection');
//korzystanie z połączenia za pomocą biblio knex która jest już skonfigurawana
// wczytujemy skonfigurowaną instancję obiektu knex
const knex = require('../knex');
const BaseModel = require("./base.model");

//konfigurujemy model, zainicjaliwany w ten sposób, że można go połączyć z bazą danych
Model.knex(knex);

//model - obiektowa interpretacja tabeli w bazie danych
class Recipe extends BaseModel {

    static get tableName(){
        return 'recipes';
    }

    //walidacja danych przed zapisaniem ich do bazy
    static get jsonSchema(){
        return {
            type: 'object',
            properties: {
                title: {type: 'string'},
            }
        }
    }
}

module.exports = Recipe;