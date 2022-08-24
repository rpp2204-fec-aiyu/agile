require('dotenv').config();
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
const {getProductId, getQuestionsList} = require('./helper/questionAPI.js')
const axios = require('axios')

const express = require('express')
const app = express();

app.use(express.static(__dirname + '/../client/dist'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

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

app.post('/reviews', (req, res) => {
  console.log({'Authorization': APIKEY});
  console.log(req.body.data);
  console.log('typeof req.body.data: ', typeof req.body.data);
  axios.post(`${BASEURL}/reviews`, req.body.data, {headers: {'Authorization': APIKEY}
})
    .then((response) => {
      console.log(response.data)
      res.status(201).send('Created');
    })
    .catch((err) => { throw err; });
})

app.get('/reviews/meta', (req, res) => {
  // console.log('req.query: ', req.query);
  axios.get(`${BASEURL}/reviews/meta`, {
    headers: {'Authorization': APIKEY},
    params: req.query
  })
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('req.params.review_id: ', req.params.review_id);
  var pathParam = req.params.review_id;
  axios.put(`${BASEURL}/reviews/${pathParam}/helpful`, {}, {headers: {'Authorization': APIKEY}}
  )
    .then((response) => {
      // console.log(response.data)
      res.status(204).send('success');
    })
    .catch((err) => { throw err; });
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