const database = require('../services/database.js');
const users = require('../config/entities').users;

async function find(context) {

    const baseQuery = users['findone'];
    console.log(baseQuery);

    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.id = context.id;

        //query += `\nwhere id = :user_id`;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;