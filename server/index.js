require('dotenv').config();
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})