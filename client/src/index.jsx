const React = require('react')
const ReactDOM = require('react-dom')
const ratingsAndReviews = require('./ratingsAndReviews.jsx');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/reviews')
      .then((response) => {
        console.log('response.data: ', response.data);
        this.setState(reviews: response.data.results);
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <div>
        <ratingsAndReviews />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))