var express = require('express');
var router = express.Router();
const modelClass = require('../../models/class')
const modelStudents = require('../../models/student')
const modelUser = require('../../models/user')
const modelTeacher = require('../../models/teacher')

router.post('/all', (req, res) => {
    let token = req.body.token
    modelUser.getInfo(token, (err, rows) => {
        if (err) return res.json({
            err: err
        })
        if (rows.length > 0) {
            let user = rows[0]
            switch (user.type) {
                // ADMIN
                case '0':
                    {
                        modelClass.getAll((err, rows) => {
                            if (err) return res.json({
                                err: err
                            })
                            user.clases = rows
                            res.json(user)
                        })
                        break
                    }
                    // PROFESOR
                case '1':
                    {
                        modelClass.getAllByToken(token, (err, rows) => {
                            if (err) return res.json({
                                err: err
                            })
                            user.clases = rows
                            res.json(user)
                        })
                        break
                    }
            }
        } else {
            res.json({ err: 'Error en la obtención del usuario activo' })
        }
    })
})

router.post('/new', (req, res) => {
    modelClass.newClass(req.body, (err, result) => {
        if (err) return res.json({ err: err })
        console.log(result)
        modelTeacher.addTeacherToClass(req.body.id_teacher, result.insertId, (err, result) => {
            if (err) return res.json({ err: err })
            res.send({ success: 'Se ha insertado el nuevo curso' })
        })        
    })
})

// http://localhost:3000/api/class/5
router.post('/:id', (req, res) => {
    let current_date = req.body.fecha ? req.body.fecha : new Date()
    modelClass.getClassInfo(req.params.id, (err, rows) => {
        if (err) return res.json({
            err: err
        })
        let clase = rows[0]
        modelStudents.getStudentsByClassId(req.params.id, (err, rows) => {
            if (err) return res.json({
                err: err
            })
            clase.students = rows
            let students_id = clase.students.map(item => item.idusers)
            modelStudents.getIncidentsByDate(current_date, students_id, (err, rows) => {
                if (err) return res.json({ err: err })
                console.log(rows)
                clase.students.forEach(student => {     
                    student.incident_type = -1
                    student.comments = ''
                    let incidencia = rows.filter(i => i.fk_user_id == student.idusers)                     
                    if (incidencia.length > 0) {
                        student.incident_type = incidencia[0].type
                        student.comments = incidencia[0].comment == null ? '' : incidencia[0].comment
                        console.log(incidencia)
                    }
                });
                res.json(clase)
            })            
        })
    })
})

router.get('/escuelas/all', (req, res) => {
    modelClass.getAllEscuelas((err, rows) => {
        if (err) return res.json({
            err: err
        })
        res.json(rows)
    })
})

router.get('/groups/all', (req, res) => {
    modelClass.getAllGroups((err, rows) => {
        if (err) return res.json({
            err: err
        })
        res.json(rows)
    })
})

module.exports = router;