require('dotenv').config();
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
const {getProductId, getQuestionsList} = require('./helper/questionAPI.js')

const express = require('express')
const app = express();


app.use(express.static(__dirname + '/../client/dist'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const axios = require('axios')

app.get('/products', (req, res) => {
  axios.get(`${BASEURL}/products`, {headers: {Authorization: APIKEY}})
    .then(products => {
      res.status(200).send(products.data)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

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