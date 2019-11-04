const express = require('express')
const router = express.Router() 
const axios = require('axios')
const stringify = require('json-stringify-safe')

router.get('/odi', (req, res, next) => {
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
      odi = []
      // console.log('data:' + data.data.matches.type)
      data.data.matches.filter(data => {
        if (data.type == 'ODI') {
          // console.log(data)
          data.team_1 = data['team-1']
          data.team_2 = data['team-2']
          odi.push(data)
        }else{
          console.log(data)
        }
      })
      res.status(200).json({
        data: odi
      })
    } catch (err) {
      console.log('error:' + err)
    }
  }
  getData()
})
module.exports = router
