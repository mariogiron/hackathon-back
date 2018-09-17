const db = require('../db')

//Clases por ID
exports.getClassInfo = (id , done) => {    
    db.get().query('SELECT name, start_date, end_date FROM class WHERE idclasse=?', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

exports.getAllByToken = (token, done) => {
    db.get().query('select c.idclasse, g.name as group_name, g.description as group_description, c.name, c.start_date, c.end_date, e.name as escuela_name from class_teacher ct, class c, groups g, escuela e where c.idclasse = ct.fk_class_id and e.idescuela = c.fk_escuela_id and g.idgroups = c.fk_group_id and ct.fk_teacher_id=(select idusers from users where token=?) and c.start_date <= NOW() and c.end_date >= NOW()', [token], (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAll = (done) => {
    db.get().query('select c.idclasse, g.name as group_name, g.description as group_description, c.name, c.start_date, c.end_date, e.name as escuela_name from class c, groups g, escuela e where g.idgroups = c.fk_group_id and e.idescuela = c.fk_escuela_id', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAllEscuelas = (done) => {
    db.get().query('select * from escuela order by name asc', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.getAllGroups = (done) => {
    db.get().query('select * from groups order by name, description asc', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

exports.newClass = ({ id_group, id_escuela, start_date, end_date }, done) => {
    db.get().query('insert into class values (?, (select name from groups where idgroups=?), ?, ?, ?, ?)', [null, id_group, start_date, end_date, id_escuela, id_group], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}