const React = require('react')
const ReactDOM = require('react-dom')
// const ratingsAndReviews = require('./ratingsAndReviews.jsx');
const axios = require('axios');

export default class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []}
  }

  componentDidMount() {
    console.log('here');
    axios.get('http://localhost:3000/reviews', {
      params: {product_id: 2}
    })
      .then((response) => {
        console.log('response.data: ', response.data);
        this.setState({reviews: response.data.results});
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <div>
        value={this.state.reviews}
      </div>
    )
  }
}