var express = require('express');
var router = express.Router();
const modelClass = require('../../models/class')
const modelStudents = require('../../models/student')

// http://localhost:3000/api/class/5
router.get('/:id', (req, res) => {
    modelClass.getClassInfo(req.params.id, (err, rows) => {
        if (err) return res.json({ err: err })
        let clase = rows[0]
        modelStudents.getSTudentsByClassId(req.params.id, (err, rows) => {
            if (err) return res.json({ err: err })
            clase.students = rows
            res.json(clase)
        })
    })
})

//

module.exports = router;