require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const {getProductId, getQuestionsList} = require('./helper/questionAPI.js')

app.use(express.static(__dirname + '/../client/dist'))

app.get('/questions', (req , res) => {
  return getQuestionsList()
    .then((result) => {
      res.status(200).send(result);
      //console.log('GOT BACK THE LIST', result);
    })
    .catch((err) => {
      res.status(500).send(err);
      //console.log('FAIL TO GET THE LIST', err);
    })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})