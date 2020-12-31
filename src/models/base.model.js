const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class BaseModel extends Model {

    $beforeInsert(queryContext) {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    $beforeUpdate(opt, queryContext) {
        this.updated_at = new Date().toISOString();
    }

    //jesli użytkownik przesle dane które zmodyfikowałyby id,
    // to nie będzie miał możliwości zmodyfikowania id, tak żeby nie nadpisał go w BD
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
        delete json.id;
        return json;
    }
}

module.exports = BaseModel;