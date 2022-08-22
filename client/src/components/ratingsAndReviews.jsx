const React = require('react')
const axios = require('axios');
import ReviewsList from './reviewsList.jsx';
import Modal from './modal.jsx';
import NewReview from './newReview.jsx';


export default class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], reviewsToRender: 2, modalIsOpen: false, productRatings: {}, productRecommendations: {}, productSizeMetaData: undefined, productQualityMetaData: undefined, productComfortMetaData: undefined, productWidthMetaData: undefined, productLengthMetaData: undefined, productFitMetaData: undefined}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/reviews', {
      params: {product_id: this.props.product_id}
    })
      .then((response) => {
        console.log('products.data: ', response.data);
        this.setState({reviews: response.data.results});
      })
      .catch((err) => {
        throw err;
      })
    this.getReviewMetaData();
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

  getReviewMetaData(review_id) {
    axios.get('http://localhost:3000/reviews/meta', {
      params: {product_id: this.props.product_id}
    })
      .then((response) => {
        console.log('reviewMeta.data: ', response.data);
        console.log('productLengthMetaData from API: ', response.data.characteristics.Length);
        this.setState({
          productRatings: response.data.ratings,
          productRecommendations: response.data.recommended,
          productSizeMetaData: response.data.characteristics.Size,
          productWidthMetaData: response.data.characteristics.Width,
          productComfortMetaData: response.data.characteristics.Comfort,
          productQualityMetaData: response.data.characteristics.Quality,
          productFitMetaData: response.data.characteristics.Fit,
          productLengthMetaData: response.data.characteristics.Length
        });
      })
      .catch((err) => {
        throw err;
      })
  }

  translateCharacteristicsToIds(characteristicsObj) {
    var {size, width, comfort, quality, length, fit} = characteristicsObj;
    console.log('size: ', size);
    console.log('width: ', width);
    console.log('comfort: ', comfort);
    console.log('quality: ', quality);

    //I have the charasteristics from props here where I could translate right?
    var results = {};
    results[this.state.productSizeMetaData.id] = size;
    results[this.state.productQualityMetaData.id] = quality;
    results[this.state.productComfortMetaData.id] = comfort;
    results[this.state.productWidthMetaData.id] = width;
    if (this.state.productLengthMetaData !== undefined) {
      console.log('this')
      results[this.state.productLengthMetaData.id] = length;
    }
    if (this.state.productFitMetaData !== undefined) {
      results[this.state.productFitMetaData.id] = fit;
    }
    console.log('characteristics obj to send to Post to /reviews: ', results);
    return results;
  }

  addNewReview(newReview) {
    var {rating, recommends, characteristics, reviewSummaryValue, reviewBodyValue, emailValue, nickname, modalIsOpen, photos} = newReview

    console.log('characteristics after submitted: ', characteristics);

    characteristics = this.translateCharacteristicsToIds(characteristics);

    recommends = recommends === 'Yes' ? true : false;

    console.log('typeof photos[0] === string: ', typeof photos[0]);

    var requestBody = {
        'product_id': this.props.product_id,
        'rating': rating,
        'summary': reviewSummaryValue,
        'body': reviewBodyValue,
        'recommend': recommends,
        'name': nickname,
        'email': emailValue,
        'photos': photos,
        'characteristics': characteristics
    };

    console.log('requestBody: ', requestBody);

    axios.post('http://localhost:3000/reviews', {
      data: {
        'product_id': this.props.product_id,
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
        return;
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
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
        <Modal isOpen={this.state.modalIsOpen} modalContent={<NewReview closeModal={this.closeModal.bind(this)} addNewReview={this.addNewReview.bind(this)} product_id={this.props.product_id} productSizeMetaData={this.state.productSizeMetaData} productQualityMetaData={this.state.productQualityMetaData} productComfortMetaData={this.state.productComfortMetaData} productWidthMetaData={this.state.productWidthMetaData} productLengthMetaData={this.state.productLengthMetaData} productFitMetaData={this.state.productFitMetaData}/>}/>
        </div>
      </div>
    )
  }
}