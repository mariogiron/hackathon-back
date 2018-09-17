const db = require('../db')
const bcrypt = require('bcrypt')

exports.login = (email, password, done) => {
  db.get().query('SELECT * FROM users WHERE email=?', [email], (err, rows) => {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.updateToken = (token, user_id, done) => {
  console.log(token, user_id)
  db.get().query('UPDATE users SET token=? WHERE idusers=?', [token, user_id], (err, result) => {
    if (err) return done(err)
    done(null, result)
  })
}

exports.register = ({ email, password, name, surname, type }, done) => {
  db.get().query('INSERT INTO users (email, password, name, surname, type) VALUES (?, ?, ?, ?, ?)', [email, bcrypt.hashSync(password, 10), name, surname, type], (err, result) => {
    if (err) return done(err)
    done(null, result)
  })
}

exports.getInfo = (token, done) => {
  db.get().query('SELECT * FROM users WHERE token=?', [token], (err, rows) => {
    if (err) return done(err)
    done(null, rows)
  })
}

