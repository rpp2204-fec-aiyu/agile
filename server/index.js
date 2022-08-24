require('dotenv').config();
const express = require('express')
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT;
const APIKEY = process.env.APIKEY;
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(cors());

app.get('/reviews', (req, res) => {
  console.log('req.query: ', req.query);
  axios.get(`${apiUrl}/reviews`, {
    headers: {'Authorization': APIKEY},
    params: req.query
  })
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})

app.get('/reviews/meta', (req, res) => {
  // console.log('req.query: ', req.query);
  axios.get(`${apiUrl}/reviews/meta`, {
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
  // const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
  axios.put(`${apiUrl}/reviews/${pathParam}/helpful`, {}, {headers: {'Authorization': APIKEY}}
  )
    .then((response) => {
      // console.log(response.data)
      res.send('success');
    })
    .catch((err) => { throw err; });
})

app.post('/reviews', (req, res) => {
  console.log({'Authorization': APIKEY});
  console.log(req.body.data);
  console.log('typeof req.body.data: ', typeof req.body.data);
  axios.post(`${apiUrl}/reviews`, req.body.data, {headers: {'Authorization': APIKEY}
})
    .then((response) => {
      console.log(response.data)
      res.send('Created');
    })
    .catch((err) => { throw err; });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})