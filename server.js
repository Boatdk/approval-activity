var app = require('./app')
var port = 7777
var activity = require('./routes/activity')
var user = require('./routes/user')
const status = require('./routes/status')

app.use('/api', activity, user, status)


var server = app.listen(port, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Listening on port' + port)
})