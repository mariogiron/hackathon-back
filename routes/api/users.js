var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const modelUser = require('../../models/user')
const utils = require('../../utils')

// http://localhost:3000/api/users/login
router.post('/login', (req, res) => {
  modelUser.login(req.body.email, req.body.password, (err, rows) => {
    if (err) return res.json({ err: 'Se ha producido un error con la base de datos' })
    if (rows.length === 0) {
      res.json({ err: 'Se ha producido un error con el usuario o la contraseña' })
    } else {
      bcrypt.compare(req.body.password, rows[0].password, function (err, hashOk) {
        if (hashOk) {
          let token = utils.generateToken(12)
          modelUser.updateToken(token, rows[0].idusers, (err, result) => {            
            if (err) return res.json({ err: 'Se ha producido un error con el usuario o la contraseña' })
            res.json({ token: token })
          })
        } else {
          res.json({ err: 'Se ha producido un error con el usuario o la contraseña' })
        }
      })
    }
  })
})

// http://localhost:3000/api/users/register
router.post('/register', (req, res) => {
  modelUser.register(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send('REGISTRADO')
  })
})

module.exports = router;