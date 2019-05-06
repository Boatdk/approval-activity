var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var methodOverride = require('method-override')
var getActivity = require('./api/activity').getActivity
var getUser = require('./api/user').getUser
var putActivity = require('./api/activity').putActivity
const doQuery = require('./utils/doQuery')
var session = require('express-session')
var login = true
var axios = require('axios')
const moment = require('moment');
const path = require('path')
const sendMails = require('./utils/email')
sha1 = require('js-sha1');

app.use('/public', express.static(path.join(__dirname, 'public')))



app.use(session({
  secret: 'keyboard cat', cookie: { maxAge: 60000 },
  resave: false, saveUninitialized: false
}))

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

///////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////////
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    login = true
    res.redirect('/')
  })
})



/////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////////
app.post('/activity', (req, res) => {
  return getUser().then((resp) => {
    let body = req.body
    const session = req.session
    var sql = `SELECT * FROM user WHERE email='${body.email}'`
    doQuery(sql).then((value) => {
      if (value[0]) {
        console.log(value)
        if (body.email != value[0].email) {

        }
        var trust = sha1(body.password)
        if (body.email == value[0].email && trust == value[0].password) {
          data3 = {
            email: body.email,
            firstname: value[0].firstname,
            type: value[0].type
          }
          session.email = body.email
          return getActivity().then((resp) => {
            var sql = `SELECT * FROM statusactivity`
            doQuery(sql).then((status) => {
              const data = [];
              resp.map(a => {
                status.map(s => {
                  if (a.id_activity === s.id_activity) {
                    let item = {
                      a,
                      s
                    }
                    data.push(item)
                  }
                })
              })
              res.render('pages/showData', {
                data: resp,
                moment: moment,
                data2: status[0],
                items: data,
                data3
              })
            })
          })
        }
      }
      login = false
      data = {
        message: 'Wrong email or passwords'
      }
      res.render('pages/LoginV2', { login, data })
    })

  })
})

app.get('/home', (req, res) => {
  res.render('layout/home')
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/psulogin', (req, res) => {
  res.render('pages/loginPSU')
})

app.post('/psulogin', (req, res) => {

})
//////////////////////////////////LOGIN PAGES//////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  return getUser().then((resp) => {
    // console.log(resp[0].email)
    console.log(login)
    res.render('pages/LoginV2', { login })
  })

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/index', (req, res) => {
  res.render('pages/index')
})

app.get('/activity', (req, res) => {
  return getActivity().then((resp) => {
    var sql = `SELECT * FROM statusactivity`
    doQuery(sql).then((status) => {
      // console.log(status)
      const data = [];
      resp.map(a => {
        status.map(s => {
          if (a.id_activity === s.id_activity) {
            let item = {
              a,
              s
            }
            data.push(item)
          }
        })
      })
      res.render('pages/showData', {
        moment: moment,
        data: resp,
        data2: status,
        items: data
      })
    })

  })
})
//////////////////////////////////////// ACTIVITY /////////////////////////////////////////////////////
app.get('/activity/create', (req, res) => {
  res.render('pages/addActivity')
})

app.post('/activity/create', (req, res) => {
   return postActivity(body)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// CREATE USER ///////////////////////////////////////////////////////
app.get('/user', (req, res) => {
  res.render('pages/addUser')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ADMIN ////////////////////////////////////////////////////////
app.get('/activity/detail-Admin', (req, res) => {

  const query = req.query
  if (req.session.email) {
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
////////////////////////////////////////// USER //////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// UPDATE DATA ////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

module.exports = app