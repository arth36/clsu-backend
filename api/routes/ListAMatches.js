const express = require('express')
const router = express.Router()
const axios = require('axios')
const stringify = require('json-stringify-safe')

router.get('/lista', (req, res, next) => {
  let mainData = null

  async function getData() {
    try {
      var data = await axios({
        method: 'GET',
        url: 'http://cricapi.com/api/matches',
        data: {
          apikey: 'M1LzSexUXMdWDCiWZRngKzs1RCH2'
        }
      })
      data = await stringify(data, null, 2)
      data = JSON.parse(data)
      t20 = []
      
      data.data.matches.filter(data => {
        if (data.type == 'ListA') {
          data.team_1 = data['team-1']
          data.team_2 = data['team-2']
          t20.push(data)
          console.log(data)
        }
      })
      
      res.status(200).json({
        data: t20
      })
    } catch (err) {
      console.log('err:' + err)
    }
  }
  getData()
})
module.exports = router
