var express = require('express')
var router = express.Router()
const doQuery = require('../utils/doQuery')
const soap = require('soap');
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const axios = require('axios')
var session = require('express-session')
router.route('/psulogin')
  .post((req, res) => {
    soap.createClient(url, (err, client) => {
      if (err) console.error(err);
      else {
        let user = {}
        user.username = req.body.username
        user.password = req.body.password
        client.GetStaffDetails(user, async function (err, response) {
          // client.GetStudentDetails(args, function(err, response) {
          if (err) console.error(err);
          else {
            //    console.log(response);
            //    res.send(response)
            if (response) {
              var sql = `SELECT * FROM user WHERE email='${response.GetStaffDetailsResult.string[0]}@psu.ac.th'`
              const user = await doQuery(sql)
              console.log(user)
              if (user.length < 1) {
                ///create user
                const uCreate= {
                  email: `${response.GetStaffDetailsResult.string[0]}@psu.ac.th`,
                  password:'12345',
                  firstname:  `${response.GetStaffDetailsResult.string[1]}'`,
                  lastname:   `${response.GetStaffDetailsResult.string[2]}'`,
                }
                postUser(uCreate).then((resp) => {
                  res.json({
                    message: 'add new account'
                  })
                  res.redirect('/psulogin')
                })
               //POST DATABASE
              }
              console.log(user.length > 0 && user[0].email == `${response.GetStaffDetailsResult.string[0]}@psu.ac.th`)
              if (user.length > 0 && user[0].email == `${response.GetStaffDetailsResult.string[0]}@psu.ac.th`) {
                data3 = {
                  email: user[0].emai,
                  firstname: user[0].firstname,
                  type: user[0].type
                }
                session.email = user[0].emai
                res.redirect('/activity')
              }
            }
            res.status(500).json({
              message: '500'
            })
          }
        });
      }
    });
  })

module.exports = router