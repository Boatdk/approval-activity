const express = require('express')
const con = require('../config/route')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const UPLOAD_PATH = 'uploads'
const del = require('del')
const doQuery = require('../utils/doQuery')

router
  .route('/activity/uploadfile')

  .post(upload.single('File'), (req, res) => {
    console.log(req.file)

    let sql = `INSERT INTO fileactivity(filename, path, mimetype) VALUES ('${req.file.filename}', '${req.file.path}', '${req.file.mimetype}')`
    doQuery(sql).then((resp) => {
      res.json({
        message: 'success',
        resp: resp,
        data: req.file

      })
    })
  })

  .get((req, res) => {
    let sql = `SELECT * FROM images`
    doQuery(sql).then((resp) => res.json(resp))
  })
