const React = require('react')
const axios = require('axios');
import ReviewsList from './reviewsList.jsx';
import ReactModal from 'react-modal';

export default class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], modalIsOpen: false}
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

  onAddReviewClick() {
    console.log('clicked');
    this.setState({modalIsOpen: true});
  }

  render() {
    //conditional logic for more reviews button
    if (this.state.reviews.length > 2) {
      var moreReviewsButton = <button>MORE REVIEWS</button>
    }

    ReactModal.setAppElement('#app');

    return (
      <div id='reviewsList'>
        <ReviewsList reviewsList={this.state.reviews} />
        {moreReviewsButton}
        <button onClick={this.onAddReviewClick.bind(this)}>ADD A REVIEW +</button>
        <ReactModal isOpen={this.state.modalIsOpen} />
      </div>
    )
  }
}