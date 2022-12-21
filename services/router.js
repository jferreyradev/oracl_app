const express = require("express");
const router = new express.Router();
//const users = require('../controllers/users.js');
//const entity = require('../controllers/entity.js');
const queries = require("../controllers/queries.js");
const cors = require('cors')

/*
router.use("/api", router);
*/
//const app = express()

//app.use(cors())
router.use(cors())

router.get("/", (req, res) => {
  res.end("Servidor activo");
});

router
  .route("/users/:user_id")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function (req, res, next) {
    res.json(req.user);
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function (req, res, next) {
    next(new Error("not implemented"));
  })
  .delete(function (req, res, next) {
    next(new Error("not implemented"));
  });

router.route("/entity/:entity").get(queries.get).put(queries.update).post(queries.insert)

/*
.post(users.post)
.put(users.put)
.delete(users.delete);
*/

module.exports = router;
