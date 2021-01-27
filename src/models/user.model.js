const BaseModel = require('./base.model');
const {Model} = require('objection')

class User extends BaseModel{
    static get tableName()
    {
        return 'users';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                login: {type: 'string'},
                password: {type: 'string'},
                name: {type: 'string'},
                surname: {type: 'string'},
                email: {type: 'string'},
            }
        }
    }

    static relationMappings() {
        return {
            receipt: {
                relation: Model.HasManyRelation,
                modelClass: require('./recipe.model'),
                join: {
                    from: 'users.id',
                    to: 'recipes.user_id'
                }
            }
        };
    }
}

module.exports = User;