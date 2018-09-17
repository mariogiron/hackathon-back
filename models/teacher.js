const db = require('../db')

exports.getTeacherInfo = (teacher_id, done) => {
  db.get().query('SELECT * FROM users u, info_teacher it WHERE u.idusers=? AND u.idusers = it.fk_user_id', [teacher_id], (err, rows) => {
    if (err) return done(err)
    done(err, rows)
  })
}

exports.getClassesFromTeacherById = (teacher_id, done) => {
  db.get().query('SELECT * FROM class c, class_teacher ct WHERE ct.fk_teacher_id=? AND c.idclasse=ct.fk_class_id', [teacher_id], (err, rows) => {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAll = (done) => {
  db.get().query('select * from info_teacher it, users u where it.fk_user_id = u.idusers', (err, rows) => {
    if (err) return done(err)
    done(null, rows)    
  })
}

exports.addTeacherToClass = (id_teacher, id_class, done) => {
  db.get().query('insert into class_teacher values (?, ?, ?)', [null, id_class, id_teacher], (err, result) => {
    if (err) return done(err)
    done(null, result)
  })
}