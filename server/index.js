require('dotenv').config();
const compression = require('compression');
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const env = process.env.NODE_ENV
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
const {getProductId, getQuestionsList} = require('./helper/questionAPI.js')
const axios = require('axios')
const createPhotoURL = require('./helper/createPhotoURLs.js');

const express = require('express')
const app = express();

const path = require('path')

app.use(compression());
app.use(express.static(__dirname + '/../client/dist'))
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit : '1000kb'}))

console.log('node environment is: ', env);
// app.get('/:product_id', (req, res) => {
//   res.send('testing')
// })
app.post('/interactions', (req, res) => {
  let interactions = req.body
  axios.post(`${BASEURL}/interactions`, interactions, {headers: {Authorization: APIKEY}})
    .then(results => {
      res.status(201).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/products', (req, res) => {
  axios.get(`${BASEURL}/products/`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/relatedProducts/:product_id', (req, res) => {
  let id = req.params.product_id
  axios.get(`${BASEURL}/products/${id}`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      res.send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/productOverview/:product_id', (req, res) => {
  let id = req.params.product_id
  const productInfo = {};

  idRequest = axios.get(`${BASEURL}/products/${id}`, {headers: {'Authorization': APIKEY}});
  stylesRequest = axios.get(`${BASEURL}/products/${id}/styles`, {headers: {'Authorization': APIKEY}})
  reviewsRequest = axios.get(`${BASEURL}/reviews/meta`, {headers: {'Authorization': APIKEY}, params: {product_id: id}})
  relatedRequest = axios.get(`${BASEURL}/products/${id}/related`, {headers: {'Authorization': APIKEY}})

  Promise.all([idRequest, stylesRequest, reviewsRequest, relatedRequest])
    .then(results => {
      productInfo.features = results[0].data.features
      productInfo.styles = results[1].data.results
      productInfo.reviews = results[2].data.ratings
      productInfo.related = results[3].data
      return productInfo
    })
    .then(productInfo => {
      res.status(200).send(productInfo)
    })
    .catch(err => {
      console.log(err)
    })
})

app.post('/cart', (req, res) => {
  let skuId = req.body
  // console.log(req.body)
  axios.post(`${BASEURL}/cart`, skuId, {headers: {Authorization: APIKEY}})
    .then(results => {
      res.status(201).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/reviews', (req, res) => {
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

app.post('/reviews', (req, res, next) => {
  createPhotoURL(req, res, next)
    .then(() => {
        axios.post(`${BASEURL}/reviews`, req.body.data, {
        headers: { 'Authorization': APIKEY }
      })
        .then((response) => {
          res.status(201).send('Created');
        })
        .catch((err) => { throw err; })
    })
    .catch((err) => { throw err; })
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

app.get('/questions/:product_id', (req , res) => {
  let id = req.params.product_id;
  //console.log('HERE ARE THE CURRENT ID:', id);
  axios.get(`${BASEURL}/qa/questions?product_id=${id}&count=50`, {
    headers: {
      'Authorization': APIKEY
    }
  })
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.post('/qa/questions/:question_id/answers', (req, res, next) => {
  let questionId = req.params.question_id;
  console.log('HERE IS THE QUESTION_ID: ', questionId);
  console.log('HERE ARE THE INFO FOR POST ANS:', req.body);
  createPhotoURL(req, res, next)
    .then(() => {
      //console.log('AFter formarteed', req.body.data);
      axios.post(`${BASEURL}/qa/questions/${questionId}/answers`, req.body.data, {headers: {'Authorization': APIKEY}})
        .then((response) => {
          res.status(201).send('Created');
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let questionId = req.params.question_id;
  axios.put(`${BASEURL}/qa/questions/${questionId}/helpful`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let ansId = req.params.answer_id;
  axios.put(`${BASEURL}/qa/answers/${ansId}/helpful`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let ansId = req.params.answer_id;
  axios.put(`${BASEURL}/qa/answers/${ansId}/report`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.post('/qa/questions', (req, res) => {
  //console.log('HERE IS THE INFO FOR POST QUES:', req.body);
  axios.post(`${BASEURL}/qa/questions`, req.body, { headers: {'Authorization': APIKEY}})
    .then((response) => {
      //console.log('HERE IS THE RESPONSE:', response)
      res.status(201).send('Created');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.get('/relatedProducts/:product_id/', (req, res) => {
  let id = req.params.product_id;
  const relatedProd = {};
  axios.get(`${BASEURL}/products/${id}/related`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      let uni = [...new Set(results.data)]
      relatedProd.relatedArr = uni;
      return relatedProd;
    })
    .then(relatedProd => {
      const id1 = relatedProd.relatedArr[0];
      axios.get(`${BASEURL}/products/${id1}/styles`, {headers: {'Authorization': APIKEY}})
        .then(results => {
          relatedProd.relatedStyle1 = results.data.results;
          return relatedProd;
        })
        .then(relatedProd => {
          let id2 = relatedProd.relatedArr[1];
          axios.get(`${BASEURL}/products/${id2}/styles`, {headers: {'Authorization': APIKEY}})
            .then(results => {
              relatedProd.relatedStyle2 = results.data.results;
              return relatedProd;
            })
            .then(relatedProd => {
              let id3 = relatedProd.relatedArr[2];
              axios.get(`${BASEURL}/products/${id3}/styles`, {headers: {'Authorization': APIKEY}})
                .then(results => {
                  relatedProd.relatedStyle3 = results.data.results;
                  return relatedProd;
                })
                .then(relatedProd => {
                  let id4 = relatedProd.relatedArr[3];
                  axios.get(`${BASEURL}/products/${id4}/styles`, {headers: {'Authorization': APIKEY}})
                    .then(results => {
                      relatedProd.relatedStyle4 = results.data.results;
                      return relatedProd;
                    })
                    .then(relatedProd => {
                      let id5 = relatedProd.relatedArr[4];
                      axios.get(`${BASEURL}/products/${id5}/styles`, {headers: {'Authorization': APIKEY}})
                        .then(results => {
                          relatedProd.relatedStyle5 = results.data.results;
                          res.send(relatedProd);
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    })
                    .catch(err => {
                      console.log(err)
                    })
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})