const express = require('express')
const router = express.Router()
const axios = require('axios')
const stringify = require('json-stringify-safe')

//console.log("Data:" + data)

router.post('/:matchId', async (req, res, next) => {
  // async function getData() {
  //   matches=[];
  //   unique=[];
  //   try{
  // let data = await axios({
  //   url: 'http://localhost:3000/matches/odi',
  //   method: 'get'
  // })
  //console.log('Data:' + data.data)
  // data = await stringify(data, null, 2)
  // data = JSON.parse(data)
  // matches.push(data.data.data.length)
  // var len=data.data.data.length;
  // for(let i=0;i<1;i++){
  //   console.log(data.data.data[i].unique_id);
  // }
  // for(let i=0;i<len;i++){
  async function getscore() {
    try {
      let data = await axios({
        method: 'GET',
        url: 'http://cricapi.com/api/cricketScore/',
        data: {
          unique_id: req.params.matchId,
          apikey: 'M1LzSexUXMdWDCiWZRngKzs1RCH2'
        }
      })
      data = await stringify(data, null, 2)
      data = JSON.parse(data)
      res.status(200).json({
        data: data.data
      })
      // this.matches=data.data

      //console.log(data)
    } catch (err) {
      res.status(504).json({
        msg: 'Something went wrong'
      })
      console.log('err:' + err)
    }
  }

  // }
  // res.status(200).json({
  //   data: data.data.data
  // })

  //   //console.log(data.data.data)
  // }catch(err){
  //   console.log('err:'+err);
  // }

  await getscore()
})
// router.get('/score', (req, res, next) => {
//   let mainData = null
//   async function getData() {
//     try {
//       console.log('hm')
//       var data = await axios({
//         method: 'get',
//         url: 'http://cricapi.com/api/matches',
//         data: {
//           "unique_id": "918033",
//           "apikey": "M1LzSexUXMdWDCiWZRngKzs1RCH2"
//         }
//       })
//       data = await stringify(data, null, 2)
//       data = JSON.parse(data)
//       odi = []
//       console.log('data:' + data.data.matches)
//       data.data.matches.filter(data => {
//         if (data.type == 'ODI') {
//           data.team_1 = data['team-1']
//           data.team_2 = data['team-2']
//           odi.push(data)
//         }
//       })
//       res.status(200).json({
//         data: odi[0].team_2
//       })
//     } catch (err) {
//       console.log('err:' + err)
//     }
//   }
//   getData()
// })
module.exports = router
