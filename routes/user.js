var express = require('express')
var con = require('../config/route')
var router = express.Router()
var mangoObjectId = require('../utils/genId')
const doQuery = require('../utils/doQuery')

router.route('/user')

  .get((req, res) => {
    var sql = `SELECT * FROM user`
    const query = req.query
    if (!!query.id) {
      sql = `SELECT * FROM user WHERE id_user='${query.id}'`
    }
    doQuery(sql).then(resp => {
      if(resp){
        res.json({
          message: resp
        })
      }
      else{
        res.json({
          message: 'Invalid User'
        })
      }
    })
      .catch((err) => {
        message : err
      })
  })

  .post((req, res) => {
    const body = req.body;
    if (body.email) {
      let sql = `SELECT * FROM user WHERE email LIKE '${body.email}'`
      var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      doQuery(sql).then((resp) => {
        let mistake = [];
        let like = []
        let action = true
        if (resp.length > 0) {
          like.push({
            message: 'existed'
          })
          action = false
        }
        if (!body.firstname) {
          mistake.push({
            message: "firstname require"
          });
        }
        if (body.password.length < 8) {
          mistake.push({
            message: 'Password must have 8 to 16 characters'
          })
          action = false
        } else if (body.password.length > 16) {
          mistake.push({
            message: 'Password must have 8 to 16 characters'
          })
          action = false
        }
        if (!body.password) {
          mistake.push({
            message: 'password require'
          })
        }
        if (!body.lastname) {
          mistake.push({
            message: "lastname require"
          });
        }
  
        if (!filter.test(body.email)) {
          mistake.push({
            message: 'email invalid format'
          })
        }
        ///
        if (like.length > 0) res.json(like)
        if (mistake.length > 0) res.json(mistake)
        return action
      }).then((resp) => {
        if (resp && body.firstname && body.lastname && body.password && filter.test(body.email)) {
          let sql = `INSERT INTO user(firstname, lastname, password, email, tel, type)
                    VALUES ('${body.firstname}', '${
                    body.lastname}', SHA1('${body.password}'), 
                    '${body.email}', '${body.tel}', 0)`;
          doQuery(sql).then(resp => {
            res.json({
              message: 'added success',
              data: resp
            })
          }).catch(err => {
            res.json({
              message: err
            });
          });
        }
  
      })
    } else {
      res.json({
        message: "email is require"
      })
    }
  })

router.route('/user/:id')

  .get((req, res) => {
  const params = req.params
  var sql = `SELECT * FROM user WHERE id_user='${params.id}'`
  doQuery(sql).then(resp => res.json(resp))
    .catch((err) => {
      res.json({
        message: err
      })
    })
})

module.exports = router