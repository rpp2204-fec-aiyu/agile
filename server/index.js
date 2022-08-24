require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const APIKEY = process.env.APIKEY
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
const axios = require('axios');

app.use(express.static(__dirname + '/../client/dist'));



app.get('/products/:product_id/styles', (req, res) => {
  let id = req.params.product_id
  console.log('ID FROM URL',id)
  axios.get(`${BASEURL}/products/${id}/styles`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})


app.get('/reviews', (req, res) => {
  console.log('req.query: ', req.query);
  axios.get(`${BASEURL}/reviews`, {
    headers: {'Authorization': APIKEY},
    params: req.query
  })
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})