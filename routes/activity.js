var express = require('express')
var con = require('../config/route')
var router = express.Router()
var mangoObjectId = require('../utils/genId')
const doQuery = require('../utils/doQuery')

router.route('/activity')

    .get((req, res) => {
        var sql = `SELECT * FROM activity`
        const query = req.query
        if(!!query.id){
            sql = `SELECT * FROM activity WHERE id='${query.id}'`
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
    var sql = `SELECT * FROM activity WHERE id='${params.id}'`
      doQuery(sql).then(resp => res.json(resp))
        .catch((err) => {
          res.json({
              message: err
            })
          })
  })

router.route('/activity/create')

    .post((req, res) => {
        const body = req.body
        var sql = `INSERT INTO activity(name, content, facaulty, tel) VALUES ('${body.name}', '${body.content}', '${body.facaulty}', '${body.tel}')`
        doQuery(sql).then(resp => res.json({message: 'added success'}))
          .catch((err) => {
            res.json({
              message: err
            })
          })
    })

module.exports = router