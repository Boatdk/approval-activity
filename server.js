var app = require('./app')
var port = 7777
var activity = require('./routes/activity')
var user = require('./routes/user')
const status = require('./routes/status')
const file = require('./routes/file')

app.use('/api', activity, user, status, file)


var server = app.listen(port, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Listening on port' + port)
})