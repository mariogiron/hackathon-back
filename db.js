var mysql = require('mysql')
var pool = null
exports.connect = function (done) {
  pool = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b4e2301d2adbc6',
    password: '23ed1acd',
    database: 'heroku_d7b8c383cff93fe',
    port: 3306,
    multipleStatements: true
  })
  done()
}
exports.get = function () {
  return pool
}

//mysql://b4e2301d2adbc6:23ed1acd@eu-cdbr-west-02.cleardb.net/heroku_d7b8c383cff93fe?reconnect=true