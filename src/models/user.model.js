const {Model} = require('objection')
const knex = require('../knex')
const BaseModel = require("./base.model");

Model.knex(knex);

class User extends BaseModel {
    static get tableName(){
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                username: {type: 'string'}
            }
        }
    }
}

module.exports = User;