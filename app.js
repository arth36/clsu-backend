const express = require('express')
const app = express()
const odiMatches = require('./api/routes/OdiMatched')
const score = require('./api/routes/score')
const t20Matches=require('./api/routes/t20Mathes')
const WomensT20Matches=require('./api/routes/WomenT20Matches')
const ListAMatches=require('./api/routes/ListAMatches')
//const morgan = require('morgan')
//const bodyParser = require('body-parser')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,GET,PATCH')
    return res.status(200).json({})
  }
  next()
})

app.use('/matches', odiMatches)
app.use('/score', score)
app.use('/matches',t20Matches);
app.use('/matches', WomensT20Matches)
app.use('/matches',ListAMatches)


app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    err: {
      msg: error.message
    }
  })
})

module.exports = app
