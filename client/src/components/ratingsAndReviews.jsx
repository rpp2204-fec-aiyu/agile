const React = require('react')
const axios = require('axios');
import ReviewsList from './reviewsList.jsx';
import Modal from './modal.jsx';
import NewReview from './newReview.jsx';


export default class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], reviewsToRender: 2, modalIsOpen: false}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/reviews', {
      params: {product_id: this.props.product_id}
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

  loadMoreReviews() {
    this.setState({reviewsToRender: this.state.reviewsToRender + 2});
  }

  addNewReview(newReview) {
    var {rating, recommends, characteristics, reviewSummaryValue, reviewBodyValue, emailValue, nickname, modalIsOpen, photos} = newReview

    recommends = recommends === 'Yes' ? true : false;

    console.log('typeof photos[0] === string: ', typeof photos[0]);

    axios.post('http://localhost:3000/reviews', {
      data: {
        'product_id': 71701,
        'rating': rating,
        'summary': reviewSummaryValue,
        'body': reviewBodyValue,
        'recommend': recommends,
        'name': nickname,
        'email': emailValue,
        'photos': photos,
        'characteristics': characteristics
      }
    })
      .then((response) => {
        console.log('response.data: ', response.data);
        // this.setState({reviews: response.data.results});
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    //conditional logic for more reviews button

    //if there's one more unrendered review in reviewList than are on the screen, show the button
    if (this.state.reviews.length - this.state.reviewsToRender >= 1) {
      var moreReviewsButton = <button onClick={this.loadMoreReviews.bind(this)}>MORE REVIEWS</button>
    }

    return (
      <div id='reviewsList'>
        <ReviewsList reviewsList={this.state.reviews} reviewsToRender={this.state.reviewsToRender}/>
        {moreReviewsButton}
        <button onClick={this.onAddReviewButtonClick.bind(this)}>ADD A REVIEW +</button>
        <div className='modal'>
        <Modal isOpen={this.state.modalIsOpen} modalContent={<NewReview closeModal={this.closeModal.bind(this)} addNewReview={this.addNewReview.bind(this)}/>}/>
        </div>
      </div>
    )
  }
}