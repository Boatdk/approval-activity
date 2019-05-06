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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
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
    doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
      return res.render('pages/upload', {
        data: resp[0]
      })
    })
  } else {
    return res.redirect('/activity')
  }
})

///////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////////
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    login = true
    return res.redirect('/')
  })
})



/////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////////
app.post('/activity', (req, res) => {

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
        doQuery(`SELECT * FROM activity`).then((resp) => {
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
            return res.render('pages/showData', {
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
    return res.render('pages/LoginV2', {
      login,
      data
    })
  })


})

app.get('/home', (req, res) => {
  return res.render('layout/home')
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/psulogin', (req, res) => {
  return res.render('pages/loginPSU')
})

//////////////////////////////////LOGIN PAGES//////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  return res.render('pages/LoginV2', {
    login: true
  })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/index', (req, res) => {
  return res.render('pages/index')
})

app.get('/activity', (req, res) => {
  var sql0 = `SELECT * FROM activity`
  doQuery(sql0).then((resp) => {
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
      return res.render('pages/showData', {
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
      doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
        var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
        doQuery(sql).then(status => {
          var sql2 = `SELECT * FROM fileactivity WHERE id_activity='${query.id}'`
          doQuery(sql2).then((data) => {
            console.log(data[0].path)
            res.render('pages/dataID-Admin', {
              data: resp[0],
              data2: status[0],
              filepath: data[0].path
            })
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
    doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
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
    doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
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
  doQuery(`UPDATE activity SET org_name = '${body.org_name}', book_num = '${body.book_num}', act_name = '${body.act_name}', dear_to = '${body.dear_to}', act_money='${body.act_money}',
  act_place = '${body.act_place}', mn_from = '${body.mn_from}', act_hours = '${body.act_hours}', tel = '${body.tel}', act_start ='${body.act_start}', act_end='${body.act_end}' 
  WHERE activity.id_activity = '${body.id_activity}'`).then((resp) => {
    res.redirect('/activity')
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get('/activity/file/dowload', (req, res) => {
//   const query = req.query
//   if(query.id) {
//     var sql = `SELECT * FROM fileactivity WHERE id_activity='${query.id}'`
//     doQuery(sql).then((resp) => {
//       console.log(resp)
//       const newpath = resp.path
//       res.redirect('localhost:7777/uploads/${newpath}')
//     })
//   }
// })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

module.exports = app