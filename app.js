var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var methodOverride = require('method-override')
var getActivity = require('./api/activity').getActivity
var postActivity = require('./api/activity').postActivity

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('dev'))
app.use(methodOverride())

app.set('view engine', 'ejs')

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
    name: body.name,
    content: body.content,
    facaulty: body.facaulty,
    tel: body.tel,
  }
  return postActivity(data).then((resp) => {
    res.redirect('/index')
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

module.exports = app