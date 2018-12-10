var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var methodOverride = require('method-override')
var getActivity = require('./api/activity').getActivity
var postActivity = require('./api/activity').postActivity
var postUser =require('./api/user').postUser
var getUser = require('./api/user').getUser
var putActivity = require('./api/activity').putActivity
const doQuery = require('./utils/doQuery')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('dev'))
app.use(methodOverride())

app.set('view engine', 'ejs')

app.get('/activity/detail/upload', (req, res) => {
  res.render('pages/upload')
})

app.get('/activity/detail/upload', function (req, res) {
  res.sendFile(__dirname + '/upload.ejs');
});

app.post('/upload', function (req, res) {
  res.send(req.files);
});


app.get('/', (req, res) => {
  res.render('pages/login')
})

app.get('/index', (req, res) => {
  res.render('pages/index')
})

app.get('/activity', (req, res) => {
  return getActivity().then((resp) => {
    res.render('pages/showData', {
      data: resp
    })
  })
})

app.get('/activity/create', (req, res) => {
  res.render('pages/addActivity')
})

app.post('/activity/create/creating', (req, res) => {
  let body = req.body
  return postActivity(body).then((resp) => {
    res.redirect('/activity')
  })
})
app.get('/user/create', (req, res) => {
  res.render('pages/addUser')
})

app.post('/user/create/creating', (req, res) => {
  let body = req.body
  return postUser(body).then((resp) => {
    if(resp.message == 'added success'){
      res.redirect('/')
    }
    if(resp.message == 'email is require'){
      res.render('pages/addUser', {data: resp})
    }
    if(resp.length > 0){
      res.render('pages/addUser', {data: resp})
    }
  })
})


app.get('/activity/detail', (req, res) => {
  const query = req.query
  if (query.id) {
    return getActivity(query.id).then((resp) => {
      var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
      doQuery(sql).then(status => {
        res.render('pages/dataID', {
          data: resp[0],
          data2: status[0]
        })
      })     
    })
  } else {
    res.redirect('/activity')
  }

})

app.get('/activity/update', (req, res) => {
  const query = req.query
  if (query.id) {
    return getActivity(query.id).then((resp) => {
      res.render('pages/putActivity', {
        data: resp[0]
      })
    })
  } else {
    res.redirect('/activity')
  }
})

app.post('/activity/update/updating', (req, res) => {
  let body = req.body
  console.log(body)
  return putActivity(body).then((resp) => {
    res.redirect('/activity')
  })
})


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

module.exports = app