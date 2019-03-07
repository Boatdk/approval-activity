const express = require('express')
const con = require('../config/route')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const UPLOAD_PATH = 'uploads'
const del = require('del')
const doQuery = require('../utils/doQuery')

var ID = function () {
  return Math.random().toString(36).substr(2, 9)
}
const cleanFolder = function (folderPath, filename) {
  del.sync([`${folderPath}/${filename}`])
}

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image file are allowed'), false)
  }
  cb(null, true)
}

var hashtime = ID(Date.now())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname
    let ext = name.substr(name.lastIndexOf('.') + 1);
    console.log(ext)
    cb(null, hashtime + '_' + ID(name) + "." + ext)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
})

const time = Date.now()
var type = upload.single('file')
router
  .route('/file/create')

  .post(type, (req, res) => {
    var body = req.body
    console.log(req.file)
    let sql = `INSERT INTO fileactivity(filename, path, id_activity) VALUES ('${req.file.filename}', '${req.file.path}', '${body.id}')`
    doQuery(sql).then((resp) => {
      res.json({
        message: 'success',
        resp: resp,
        data: req.file
      })
    })
  })

  .get((req, res) => {
    let sql = `SELECT * FROM fileactivity`
    doQuery(sql).then((resp) => res.json(resp))
  })



router
  .route('/images/delete')

  .post((req, res) => {
    const body = req.body
    let sql = `SELECT * FROM images WHERE id='${body.id}'`
    doQuery(sql).then((resp) => {
      let state = false
      console.log(resp)
      if (resp) {
        for (let img of resp) {
          if (img.id == body.id) {
            cleanFolder(UPLOAD_PATH, img.filename)
            state = true
          }
        }
      }
      return state
    }).then((state) => {
      if (state) {
        sql = `DELETE FROM images WHERE id='${body.id}'`
        doQuery(sql).then((resp) => {
          res.json({
            message: 'delete success'
          })
        })
      } else {
        res.json({
          message: 'error'
        })
      }

    })
  })




router
  .route('/images/:filename')

  .get((req, res) => {

    const params = req.params
    let sql = `SELECT * FROM images WHERE filename='${params.filename}'`
    doQuery(sql).then((resp) => {
      if (resp) {
        for (let img of resp) {
          if (params.filename == img.filename) {
            res.setHeader('Content-Type', img.mimetype)
            fs.createReadStream(path.join(UPLOAD_PATH, img.filename)).pipe(res)
            return
          }
        }
      }
      res.sendStatus(404)
    })

  })
  
module.exports = router