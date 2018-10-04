var app = require('./app')
var port = 7777
var activity = require('./routes/activity')

app.use('/api', activity)

var server = app.listen(port, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Listening on port' + port)
})