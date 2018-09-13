const db = require('../db')

//Clases por ID
exports.getClassInfo = (id , done) => {
    console.log(id);
    db.get().query('SELECT name, start_date, end_date FROM class WHERE idclasse=?', [id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}