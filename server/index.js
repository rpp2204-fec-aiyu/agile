require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const axios = require('axios')
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'

app.use(express.static(__dirname + '/../client/dist'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/products', (req, res) => {
  axios.get(`${BASEURL}/products/`, {headers: {'Authorization': APIKEY}}) //71703/styles
    .then(results => {
      console.log('FROM GET REQ: ', results.data)
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/products/:product_id', (req, res) => {
  let id = req.params.product_id
  console.log('ID FROM URL',id)
  axios.get(`${BASEURL}/products/${id}/styles`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      //console.log(results.data)
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})