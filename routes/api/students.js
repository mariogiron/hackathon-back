var express = require('express');
var router = express.Router();
const modelClass = require('../../models/class')
const modelStudents = require('../../models/student')

// http://localhost:3000/api/students/12
router.get('/:id', (req, res) => {   
    console.log("ENTRA")
    modelStudents.getStudentById(req.params.id, (err, rows) => {
        if (err) return res.json({ err: err })
        let clase = rows[0]
        modelClass.getClassInfo(req.params.id, (err, rows) => {
            if (err) return res.json({ err: err })
            clase.clases = rows
            res.json(clase)
        })
    })
})

module.exports = router;