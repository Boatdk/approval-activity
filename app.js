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
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const soap =require('soap')
const path = require('path')
const apiuser = 'http://localhost:7777/api/user'
const sendMails = require('./utils/email')
app.use('/public', express.static(path.join(__dirname, 'public')))



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

///////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////////
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      login = true
      res.redirect('/')
    })
})



/////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////////
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
          var trustpsw = '8cb2237d0679ca88db6464eac60da96345513964'
          var trust = 'SHA1(body.password)'
          
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
        res.render('pages/LoginV2', {login, data})
      }
    })

  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/psulogin', (req, res) => {
  res.render('pages/loginPSU')
})

app.post('/psulogin', (req, res) => {
  soap.createClient(url, (err, client) => {
    if(err) console.err(err)
    else{
      let user = {}
      user.username = req.body.username
      user.password = req.body.password

      client.GetStaffDetails(user, function (err, response) {
        // client.GetStudentDetails(args, function(err, response) {
        if (err) console.error(err);
        else {
            console.log(response);
            res.send(response);
            res.render('pages/showData')
            
        }
    });
    }
    })
})
//////////////////////////////////LOGIN PAGES//////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  return getUser().then((resp) => {
    // console.log(resp[0].email)
    console.log(login)
    res.render('pages/LoginV2', {login})
  })
  
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/index', (req, res) => {
  res.render('pages/index')
})

app.get('/activity', (req, res) => {
  return getActivity().then((resp) => {
    var sql = `SELECT * FROM statusactivity`
    doQuery(sql).then((status)=> {
      console.log(status.data)
      res.render('pages/showData', {
        data: resp,
        data2: status,
        
      })
    })
    
  })
})
///////////////////////////////////////////////////// CREATE ACTIVITY ///////////////////////////////////////
app.get('/activity/create', (req, res) => {
  res.render('pages/addActivity')
})

app.post('/activity/create/creating', (req, res) => {
  let body = req.body
  return postActivity(body).then((resp) => {
    sendMails().then((resp)=>{
      res.redirect('/activity')
    })
    
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// CREATE USER ///////////////////////////////////////////////////////
app.get('/user', (req, res) => {
  res.render('pages/addUser')
})
app.post('/user', (req, res) => {
  let body = req.body
  
  return axios.post(apiuser, body).then((resp) => {
    res.redirect('/')
  })
  //   if(resp.message == 'added success'){
  //     console.log({message:"addded success"})
  //     res.redirect('/')
  //   }
  //   if(resp.message == 'email is require'){
  //     res.render('pages/addUser', {data: resp})
  //   }
  //   if(resp.length > 0){
  //     res.render('pages/addUser', {data: resp})
  //   }
  // })
  // return postUser(body).then((resp) => {
    
  // })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ADMIN ////////////////////////////////////////////////////////
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