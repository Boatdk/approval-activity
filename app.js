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
var session = require('express-session')
var login = true
var axios = require('axios')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('dev'))
app.use(methodOverride())

app.set('view engine', 'ejs')

app.get('/activity/file', (req, res) => {
  const query = req.query
  if (query.id) {
    return getActivity(query.id).then((resp) => {
      res.render('pages/upload', {
        data: resp[0]
      })
    })
  } else {
    res.redirect('/activity')
  }
})
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      login = true
      res.redirect('/')
    })
})



app.post('/activity', (req, res) => {
  return getUser().then((resp)=>{
    let body = req.body
    const session = req.session
    var sql = `SELECT * FROM user WHERE email='${body.email}'`
    doQuery(sql).then((value) => {
      if(value[0]){
        console.log(value)
        if(body.email != value[0].email){
          
        }
        if(body.email == value[0].email){
          data3 = {
            email : body.email,
            firstname: value[0].firstname,
            type : value[0].type
          }
          session.email = body.email
          return getActivity().then((resp) => {
            var sql = `SELECT * FROM statusactivity`
            doQuery(sql).then((status)=> {
              res.render('pages/showData', {
                data: resp,
                data2: status[0],
                data3
              })
            })
           
          })
        }
      }
      else{
        login = false
        data = {
          message: 'Wrong email or passwords'
        }
        res.render('pages/SignIn', {login, data})
      }
    })

  })
})


app.get('/', (req, res) => {
  return getUser().then((resp) => {
    // console.log(resp[0].email)
    res.render('pages/SignIn', {login})
  })
  
})

app.get('/index', (req, res) => {
  res.render('pages/index')
})

app.get('/activity', (req, res) => {
  return getActivity().then((resp) => {
    var sql = `SELECT * FROM statusactivity`
    doQuery(sql).then((status)=> {
      res.render('pages/showData', {
        data: resp,
        data2: status[0]
      })
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


app.get('/activity/detail-Admin', (req, res) => {
  
  const query = req.query
  if(req.session.email){
    if (query.id) {
      return getActivity(query.id).then((resp) => {
        var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
        doQuery(sql).then(status => {
          res.render('pages/dataID-Admin', {
            data: resp[0],
            data2: status[0]
          })
        })     
      })
    } else {
      res.redirect('/activity')
    }
  }
  

})

app.get('/activity/detail', (req, res) => {
  const query = req.query
  if (query.id) {
    return getActivity(query.id).then((resp) => {
      var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
      doQuery(sql).then(status => {
        res.render('pages/dataID-user', {
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