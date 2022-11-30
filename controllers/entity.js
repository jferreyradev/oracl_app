const entity = require('../db_apis/entity.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);
    context.entity = req.params.entityname;
    context.sentence = 'findone';

    const rows = await entity.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.getone = get;