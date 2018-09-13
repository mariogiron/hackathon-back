var express = require('express');
var router = express.Router();
const usersRouter = require('./api/users')

router.use('/users', usersRouter)

module.exports = router;
