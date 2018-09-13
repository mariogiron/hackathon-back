var express = require('express');
var router = express.Router();

const usersRouter = require('./api/users')
const teachersRouter = require('./api/teachers')
const classesRouter = require('./api/class')

router.use('/users', usersRouter)
router.use('/teachers', teachersRouter)
router.use('/class', classesRouter)

module.exports = router;
