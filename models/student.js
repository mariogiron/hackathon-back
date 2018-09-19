const db = require('../db')
const moment = require('moment')

exports.getStudentsByClassId = ( id , done) => {
    db.get().query('select dni, address, phone, email, name, surname, picture, idusers from info_student ist, users u, class_student cs WHERE cs.fk_student_id = ist.idinfo_student AND ist.fk_user_id = u.idusers AND cs.fk_class_id = ?;', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

exports.getStudentById = (id, done) => {
    db.get().query('select dni, address, phone, email, name, surname, picture, idusers from info_student, users where idinfo_student = idusers AND idinfo_student = ?', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

exports.getIncidentsByDate = (date, students, done) => {
    console.log(date, students)
    let cDate = moment(date).format('YYYY-MM-DD')
    db.get().query('select * from student_incidents where date_incident=? and fk_user_id in (?)', [cDate, students], (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.updateStatus = (alumno_id, falta, fecha_cambio, done) => {    
    if (!falta) {
        db.get().query('delete from student_incidents where date_incident = ? and fk_user_id = ?', [fecha_cambio, alumno_id], (err, result) => {
            if (err) done(err)
            done(null, result)
        })
    } else {
        db.get().query('insert into student_incidents (date_incident, type, fk_user_id) values (?, ?, ?)', [fecha_cambio, '0', alumno_id], (err, result) => {
            if (err) done(err)
            done(null, result)
        })
    }
}