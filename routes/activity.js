var express = require('express')
var router = express.Router()
const doQuery = require('../utils/doQuery')
const sendEmails = require('../utils/email')

router.route('/activity')

  .get((req, res) => {
    var sql = `SELECT * FROM activity`
    const query = req.query
    if (!!query.id) {
      sql = `SELECT * FROM activity WHERE id_activity='${query.id}'`
    }
    doQuery(sql).then(resp => res.json(resp))
      .catch((err) => {
        res.json({
          message: err
        })
      })


  })

  .post((req, res) => {
    var body = req.body
    console.log(body)
    var sql = `INSERT INTO activity(org_name, book_num, act_name, dear_to, act_start, act_end, act_place, act_money, act_hours, tel, mn_from) 
              VALUES ('${body.org_name}', '${body.book_num}', '${body.act_name}', '${body.dear_to}', '${body.act_start}', 
              '${body.act_end}', '${body.act_place}','${body.act_money}', '${body.act_hours}', '${body.tel}', '${body.mn_from}')`
    doQuery(sql).then(resp => {
      // console.log(resp.insertId)
      var sql2 = `INSERT INTO statusactivity (id_activity) VALUES ('${resp.insertId}')`
      doQuery(sql2).then(resp => {
        console.log({
          message: 'added success'
        })
        sendEmails()
        res.redirect('/activity')
        
      })
      var sql3 = `INSERT INTO fileactivity(id_activity) VALUES ('${resp.insertId}')`
      doQuery(sql3).then(resp => {
        res.json({
          message: 'added id_activity with file success'
        })
      })
    })
    .catch((err) => {
      res.json({
        message: err
      })
    })

  })

router.route('/activity/:id')

  .get((req, res) => {
    const params = req.params
    var sql = `SELECT * FROM activity WHERE id_activity='${params.id}'`
    doQuery(sql).then(resp => res.json(resp))
      .catch((err) => {
        res.json({
          message: err
        })
      })
  })

  .put((req, res) => {
    var body = req.body
    var query = req.query
    var sql = `UPDATE activity SET org_name = '${body.org_name}', book_num = '${body.book_num}', act_name = '${body.act_name}', dear_to = '${body.dear_to}', act_money='${body.act_money}',
    act_place = '${body.act_place}', mn_from = '${body.mn_from}', act_hours = '${body.act_hours}', tel = '${body.tel}', act_start ='${body.act_start}', act_end='${body.act_end}' 
    WHERE activity.id_activity = '${body.id_activity}'`
    doQuery(sql).then(resp => res.json({
        message: ' update success ',
        resp
      }))
      .catch((err) => {
        res.json({
          message: err
        })
      })
  })

module.exports = router