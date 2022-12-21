const queries = require("../db_apis/queries.js");
const entities = require("../config/entities").entities;

async function time(req, res, next) {
  console.log("Time:", Date.now());
  next();
}

async function select(req, res, next) {
  try {
    const context = {};

    context.id = Number(req.params.id);
    context.entity = req.params.entity;
    context.entityobj = entities[context.entity];
    context.query = req.query;
    //context.sentence = 'findone';

    let result;

    //console.log(context);
    //console.log(entities[context.entity]);

    if (entities[context.entity]) {

      result = await queries.find(context);

      //console.log(entities[context.entity], req.query);

      if (result.rows.length > 0) {
        console.log(result.rows)
        res.status(200).json(result.rows);
      } else {
        res.status(404).end();
      }
    }
  } catch (err) {
    next(err);
  }

  //q.run()
  next();
}

async function update(req, res, next) {
    try {

        const context = {};

        context.body = req.body;
        context.entity = req.params.entity;
        context.entityobj = entities[context.entity];
        context.query = req.query;

      let result;
  
      console.log(context);
      //console.log(entities[context.entity]);
  
      if (entities[context.entity]) {
        result = await queries.modify(
          context.entityobj,
          context
        );  
  
        if (result.rows.length > 0) {
          res.status(200).json(result.rows);
        } else {
          res.status(404).end();
        }
      }
    } catch (err) {
      next(err);
    }
  
    //q.run()
    next();
  };

  async function insert(req, res, next) {
    try {

        const context = {};

        context.id = Number(req.params.id);
        context.entity = req.params.entity;
        context.entityobj = entities[context.entity];
        context.query = req.body;

      let result;
  
      if (entities[context.entity]) {
        result = await queries.create(
          context.entityobj,
          context.query
        );
    
        if (result.rows.length > 0) {
          res.status(200).json(result.rows);
        } else {
          res.status(404).end();
        }
      }
    } catch (err) {
      next(err);
    }
  
    //q.run()
    next();
  };

module.exports = {
    get: select,
    gettime: time,
    update,
    insert
}


/*
router.use("/post/:entity", async function (req, res, next) {
  try {
    let result;

    console.log(req.params.entity);
    console.log(req.query);

    if (entities.jsonEntity[req.params.entity]) {
      result = await q.create(
        entities.jsonEntity[req.params.entity],
        req.query
      );

      console.log(entities.jsonEntity[req.params.entity], req.query);

      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).end();
      }
    }
  } catch (err) {
    next(err);
  }

  //q.run()
  next();
});

*/
