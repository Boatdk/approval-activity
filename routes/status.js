var express = require('express')
var con = require('../config/route')
var router = express.Router()
var mangoObjectId = require('../utils/genId')
const doQuery = require('../utils/doQuery')

router.route('/status')

    .get((req, res) => {
        var sql = `SELECT * FROM statusactivity`
        const query = req.query
        if (!!query.id) {
            sql = `SELECT * FROM status WHERE id='${query.id}'`
        }
        doQuery(sql).then(resp => res.json(resp))
            .catch((err) => {
                res.json({
                    message: err
                })
            })


    })

router.route('/status/update')

    .get((req, res) => {
        const body = req.body
        const query = req.query
        var sql = `UPDATE statusactivity set ${query.field}='${query.state}' WHERE id_activity='${query.id}'`
        doQuery(sql).then(resp => {
                // res.json(resp)
                res.redirect(`/activity/detail-Admin?id=${query.id}`)
            })
            .catch((err) => {
                res.json({
                    message: err
                })
            })
    })

module.exports = router