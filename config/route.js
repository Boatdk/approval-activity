var mysql = require('mysql')

var con = mysql.createConnection({
    host        : 'db1',
    user        : 'root',
    password    : 'test',
    database    : 'approval_system'
})

con.connect(function(err) {
    if(err) throw err
    console.log("Server was connected!")
})

module.exports = con
