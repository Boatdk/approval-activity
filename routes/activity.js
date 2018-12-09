var express = require('express')
var con = require('../config/route')
var router = express.Router()
var mangoObjectId = require('../utils/genId')
const doQuery = require('../utils/doQuery')

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

router.route('/activity/create')

  .post((req, res) => {
    var body = req.body
    var sql = `INSERT INTO activity(org_name, book_num, act_name, dear_to, act_start, act_end, act_place, act_money, act_hours, tel, mn_from) 
              VALUES ('${body.org_name}', '${body.book_num}', '${body.act_name}', '${body.dear_to}', '${body.act_start}', 
              '${body.act_end}', '${body.act_place}','${body.act_money}', '${body.act_hours}', '${body.tel}', '${body.mn_from}')`
    doQuery(sql).then(resp => res.json({
        message: 'added success'
      }))
      .catch((err) => {
        res.json({
          message: err
        })
      })

  })

router.route('/activity/update')

  .post((req, res) => {
    var body = req.body
    var sql = `UPDATE activity SET org_name='${body.org_name}', book_num='${body.book_num}', dear_to='${body.dear_to}', act_start='${body.act_start}', act_end='${body.act_end}', 
              act_place='${body.act_place}' , act_money='${body.act_money}', act_hours='${body.act_hours}', tel='${body.tel}', mn_from='${body.mn_from}' WHERE id_activity='${query.id}'`
    doQuery(sql).then(resp => res.json({
        message: 'update success '
      }))
      .catch((err) => {
        res.json({
          message: err
        })
      })
  })

module.exports = router