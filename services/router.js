const express = require('express');
const router = new express.Router();
const users = require('../controllers/users.js');
const entity = require('../controllers/entity.js');


router.route('/entity/:entityname/:id?')
  .get(entity.getone);

/*
.post(users.post)
.put(users.put)
.delete(users.delete);
*/

module.exports = router;