const React = require('react')
const axios = require('axios');
import ReviewsList from './reviewsList.jsx';
import Modal from './modal.jsx';
import NewReview from './newReview.jsx';


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

  onAddReviewButtonClick() {
    console.log('clicked');
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    //close modal when submit button is clicked
    this.setState({modalIsOpen: false});
    //pass down as a prop to Modal
  }

  addNewReview() {

  }

  render() {
    //conditional logic for more reviews button
    if (this.state.reviews.length > 2) {
      var moreReviewsButton = <button>MORE REVIEWS</button>
    }

    return (
      <div id='reviewsList'>
        <ReviewsList reviewsList={this.state.reviews} />
        {moreReviewsButton}
        <button onClick={this.onAddReviewButtonClick.bind(this)}>ADD A REVIEW +</button>
        <div className='modal'>
        <Modal isOpen={this.state.modalIsOpen} modalContent={<NewReview closeModal={this.closeModal.bind(this)} />}/>
        </div>
      </div>
    )
  }
}