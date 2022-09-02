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
  axios.get(`${BASEURL}/products/`, {headers: {'Authorization': APIKEY}}) // 71701
    .then(results => {
      //console.log('FROM GET REQ: ', results.data)
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/productOverview/:product_id', (req, res) => {
  let id = req.params.product_id
  const productInfo = {};
  axios.get(`${BASEURL}/products/${id}`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      productInfo.features = results.data.features;
      return productInfo;
    })
    .then(productInfo => {
      axios.get(`${BASEURL}/products/${id}/styles`, {headers: {'Authorization': APIKEY}})
        .then(results => {
          productInfo.styles = results.data.results;
          res.status(200).send(productInfo);
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
})

app.post('/cart', (req, res) => {
  let skuId = req.body
  console.log(req.body)
  axios.post(`${BASEURL}/cart`, skuId, {headers: {Authorization: APIKEY}})
    .then(results => {
      res.status(201).send(results.data)
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

app.get('/questions/:product_id', (req , res) => {
  let id = req.params.product_id;
  //console.log('HERE ARE THE CURRENT ID:', id);
  axios.get(`${BASEURL}/qa/questions?product_id=${id}&count=30`, {
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

app.post('/qa/questions', (req, res) => {
  console.log('HERE IS THE INFO FOR POST QUES:', req.body);
  axios.post(`${BASEURL}/qa/questions`, req.body, { headers: {'Authorization': APIKEY}})
    .then((response) => {
      console.log('HERE IS THE RESPONSE:', response)
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})