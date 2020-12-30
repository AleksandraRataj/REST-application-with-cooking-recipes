const {Model} = require('objection');
const knex = require('../knex');
const BaseModel = require("./base.model");

Model.knex(knex);

class Recipe extends BaseModel {

    static get tableName(){
        return 'recipes';
    }

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