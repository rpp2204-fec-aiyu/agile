require('dotenv').config();
const express = require('express')
const app = express();
const axios = require('axios');
const PORT = process.env.PORT;
const APIKEY = process.env.APIKEY;
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.get('/reviews', (req, res) => {
  console.log('req.query: ', req.query);
  axios.get(`${apiUrl}/reviews`, {
    headers: {'Authorization': APIKEY},
    params: req.query
  })
    .then((response) => {
      console.log(response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})

app.post('/reviews', (req, res) => {
  console.log('req.body: ', req.body);
  axios.post(`${apiUrl}/reviews`, {
    headers: {'Authorization': APIKEY},
    params: req.body
  })
    .then((response) => {
      console.log(response.data)
      res.send(response.data);
    })
    .catch((err) => { throw err; });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})