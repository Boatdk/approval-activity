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

//////////////// VIEW EJS /////////////////////
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views/pages'));

app.set('views',__dirname+'/views');

app.set('view engine','ejs');

///////////////// SESSION /////////////////
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
  // session.destroy((err) => {
  //   login = true
  // })
  req.session.destroy((err) => {
    login = true
  })
  return res.redirect('/')
})



/////////////////////////////////////// LOGIN ROUTE///////////////////////////////////////////////////////////////
app.post('/activity', (req, res) => {

  let body = req.body
  const session = req.session
  var sql = `SELECT * FROM user WHERE email='${body.email}'`
  doQuery(sql).then((value) => {
    if (value[0]) {
      console.log(value)
      var trust = sha1(body.password)
      if (body.email == value[0].email && trust == value[0].password) {
        var data3 = {
          email: body.email,
          firstname: value[0].firstname,
          type: value[0].type
        }
        session.data3 = data3
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
      }else{
        login = false
        var data = {
          message: 'Wrong email or passwords'
        }
        return res.render('pages/LoginV2', {
          login,
          data
        })
      }
    }
    else{
      login = false
      var data = {
        message: 'Wrong email or passwords'
      }
      return res.render('pages/LoginV2', {
        login,
        data
      })
    }
    
  })


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
  var data3 = session.data3 ? session.data3: req.session.data3
  return res.render('pages/index', {data3})
})
///////////////////////////////////// GET ACTIVITY PAGE ////////////////////////////////////////////////////
app.get('/activity', (req, res) => {
  var data3 = session.data3 ? session.data3: req.session.data3
  console.log("req"+ req.session.email)
  var email = session.email ? session.email: req.session.email
  console.log("ACTVITY")
  console.log(data3)
  console.log(email)
  console.log("---------------")
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
        items: data,
        data3
      })
    })

  })
})
//////////////////////////////////////// ACTIVITY /////////////////////////////////////////////////////
app.get('/activity/create', (req, res) => {
  var data3 = session.data3 ? session.data3: req.session.data3
  const email = session.email ? session.email: req.session.email
  doQuery(`SELECT * FROM user WHERE email='${email? email:data3.email}'`).then(user=>{
    if(user.length > 0){
      return res.render('pages/addActivity', {data3,user:user[0]})
    }
    else{
      return res.redirect('/activity')
    }
  })
  
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
  const email = session.email ? session.email: req.session.email
  if (email) {
    if (query.id) {
      doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
        console.log(resp[0])
        var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
        doQuery(sql).then(status => {
          var sql2 = `SELECT * FROM fileactivity WHERE id_activity='${query.id}'`
          doQuery(sql2).then((data) => {
            doQuery(`SELECT * FROM user WHERE email='${email}'`).then(user => {
              let data3
              let file = ''
              if(user.length > 0){
                data3 = {
                  email: user[0].email,
                  firstname: user[0].firstname,
                  type: user[0].type
                }
              }
              else{
                 data3 = session.data3 ? session.data3: req.session.data3
              }

              if(data.length > 0){
                file = data[0].path
              }
              return res.render('dataID-Admin', {
                data: resp[0],
                data2: status[0],
                filepath: file,
                data3
              })
            })   
          })
        })
      })
    } else {
      return res.redirect('/activity')
    }
  }else{
    return res.redirect('/activity')
  }
})

////////////////////////////////////////// USER //////////////////////////////////////////////////////
app.get('/activity/detail', (req, res) => {
  const query = req.query
  if (query.id) {
    doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
      var sql = `SELECT * FROM statusactivity WHERE id_activity='${query.id}'`
      doQuery(sql).then(status => {
        var data3 
        var email = session.email ? session.email:req.session.email
        doQuery(`SELECT * FROM user WHERE email='${email}'`).then((user) => {
          if(user.length > 0){
            data3 = {
              email: user[0].email,
              firstname: user[0].firstname,
              type: user[0].type,
              id: user[0].id_user
            }
          }else{
            data3 = session.data3 ? session.data3:req.session.data3
          }
          res.render('dataID-user', {
            data: resp[0],
            data2: status[0],
            data3
          })
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
  var data3 = session.data3 ? session.data3: req.session.data3
  if (query.id) {
    doQuery(`SELECT * FROM activity WHERE id_activity='${query.id}'`).then((resp) => {
      res.render('pages/putActivity', {
        data: resp[0],
        data3
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