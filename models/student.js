const db = require('../db')

exports.getSTudentsByClassId = ({ id }, done) => {
    db.get().query('select dni, address, phone, email, name, surname, picture, idusers from info_student ist, users u, class_student cs WHERE cs.fk_student_id = ist.idinfo_student AND ist.fk_user_id = u.idusers AND cs.fk_class_id = ?;', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}