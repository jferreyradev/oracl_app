const database = require('../services/database.js');
const entities = require('../config/entities.js').entities;

async function find(context) {

    const baseQuery = entities[context.entity];

    let query = baseQuery[context.sentence];

    const binds = {};

    if (context.id) {
        binds.id = context.id;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;