var express = require('express');
var router = express.Router();
const modelTeacher = require('../../models/teacher')

router.get('/all', (req, res) => {
  modelTeacher.getAll((err, rows) => {
    if (err) return res.json({ err: err })
    res.json(rows)
  })
})

router.get('/:id', (req, res) => {
  modelTeacher.getTeacherInfo(req.params.id, (err, rows) => {
    if (err) return res.json({ err: err })
    res.json(rows[0])
  })
})

router.get('/:id/classes', (req, res) => {
  modelTeacher.getClassesFromTeacherById(req.params.id, (err, rows) => {
    if (err) return res.json({ err: err })
    res.json(rows)
  })
})

module.exports = router;