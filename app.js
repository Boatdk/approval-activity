var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var methodOverride = require('method-override')
var getActivity = require('./api/activity').getActivity
var postActivity = require('./api/activity').postActivity
var postUser =require('./api/user').postUser
var getUser = require('./api/user').getUser

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
  let data = {
    org_name: body.org_name,
    book_num: body.book_num,
    act_name: body.act_name,
    dear_to: body.dear_to,
    act_start: body.act_start,
    act_end: body.act_end,
    act_place: body.act_place,
    act_money: body.act_money,
    act_hours: body.act_hours,
    mn_from: body.mn_from,
    tel: body.tel
  }
  return postActivity(data).then((resp) => {
    res.redirect('/activity')
  })
})
app.get('/user/create', (req, res) => {
  res.render('pages/addUser')
})

app.post('/user/create/creating', (req, res) => {
  let body = req.body
  let data = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
    tel: body.tel
  }
  return postUser(data).then((resp) => {
    res.redirect('/')
  })
})


app.get('/activity/detail', (req, res) => {
  const query = req.query
  if (query.id) {
    return getActivity(query.id).then((resp) => {
      res.render('pages/dataID', {
        data: resp[0]
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

module.exports = app