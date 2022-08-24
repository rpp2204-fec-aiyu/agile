require('dotenv').config();
const axios = require('axios');

//api:  https://app-hrsei-api.herokuapp.com/api/fec2/:CAMPUS_CODE/

let getProductId = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
    headers: {
      'Authorization': `${process.env.APIKEY}`
    }
  })
  .then((res) => {
    return res.data;
    //console.log('HERE ARE THE LIST OF PRODUCTS: ', res.data);
  })
  .catch((err) => {
    return err;
    //console.log('ERROR IN GET DATA', err);
  })
}
//product_id range:71697 - 71701
let getQuestionsList = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=71701', {
    headers: {
      'Authorization': `${process.env.APIKEY}`
    }
  })
  .then((res) => {
    return res.data;
    //console.log('HERE ARE THE QUESTIONS LIST DATA: ', res.data);
  })
  .catch((err) => {
    return err;
    //console.log('ERROR IN GET DATA', err);
  })
}

module.exports = {getProductId, getQuestionsList};














// let getQuestionsList = () => {
//   return axios({
//     method: 'get',
//     url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
//     headers: {
//       'User-Agent': 'request',
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       'Authorization': `token ${process.env.APIKEY}`
//     }
//   })
//   .then(function(res) {
//     console.log('HERE ARE THE QUESTIONS LIST DATA: ', res.data);
//   })
//   .catch(function(err) {
//     console.log('ERROR IN GET DATA', err);
//   })
// }