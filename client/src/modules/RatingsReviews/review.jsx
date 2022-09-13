const React = require('react')
const axios = require('axios');
import Modal from './modal.jsx';
import starImg from '../../../assets/star.png';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFullReviewBodyShown: false, helpfulButtonClicked: false, 'photo1ModalIsOpen': false, 'photo2ModalIsOpen': false, 'photo3ModalIsOpen': false, 'photo4ModalIsOpen': false, 'photo5ModalIsOpen': false}
  }

  expandModal(photoNum) {
    // console.log('photoNum: ', photoNum);
    if (photoNum === 1) {
      this.setState({photo1ModalIsOpen: true});
    } else if (photoNum === 2) {
      this.setState({photo2ModalIsOpen: true});
    } else if (photoNum === 3) {
      this.setState({photo3ModalIsOpen: true});
    } else if (photoNum === 4) {
      this.setState({photo4ModalIsOpen: true});
    } else if (photoNum === 5) {
      this.setState({photo5ModalIsOpen: true});
    }
  }

  closeModal(photoNum) {
    if (photoNum === 1) {
      this.setState({photo1ModalIsOpen: false});
    } else if (photoNum === 2) {
      this.setState({photo2ModalIsOpen: false});
    } else if (photoNum === 3) {
      this.setState({photo3ModalIsOpen: false});
    } else if (photoNum === 4) {
      this.setState({photo4ModalIsOpen: false});
    } else if (photoNum === 5) {
      this.setState({photo5ModalIsOpen: false});
    }
  }

  generateStarWidths(roundedRating) {
    var widthsOfStars = [...Array(5)].map((rating, index) => {
      if (roundedRating > 1) {
        roundedRating = roundedRating - 1;
        return 1;
      } else if (roundedRating > 0) {
        var roundedDec = roundedRating;
        roundedRating = roundedRating - roundedRating;
        return roundedDec
      } else {
        return 0;
      }
    })
    return widthsOfStars;
  }

  generateStarsFromRating(rating) {
    var arrayOfWidths = this.generateStarWidths(rating);
    return (
      <div id='reviewsQuarterStars'>
        {arrayOfWidths.map((width, index) => {
          return (
          <div className='single-review-star-container' key={index}>
            <div className='single-review-star-fill' style={{'width': (width * 18.6).toString() + 'px'}}>
              <img className='single-review-star-outline' src={starImg}></img>
            </div>
          </div>
          )
        })}
      </div>
    )
  }

  addToHelpfulNessCount() {

    axios.put(`/reviews/${this.props.review.review_id}/helpful`)
    .then((response) => {
      this.setState({helpfulButtonClicked: true});
      this.props.getReviewsList();
    })
    .catch((err) => {
      alert('Error updating helpfulness count');
    })
  }

  formatDate(date) {
     var formattedDate = '';

     var dates = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
     };

     var yearMonthHyphenIndex = date.indexOf('-');

     var monthDayHyphenIndex = date.indexOf('-', yearMonthHyphenIndex + 1);

     var year = date.slice(0, yearMonthHyphenIndex);

     var month = dates[date.slice(yearMonthHyphenIndex + 1, monthDayHyphenIndex)];

     var day = date.slice(monthDayHyphenIndex + 1, date.indexOf('T'));

     formattedDate += month + ' ' + day + ', ' + year;

     return formattedDate;
  }

  showFullReviewBody() {
    this.setState({isFullReviewBodyShown: true})
  }

  splitReviewBody(reviewBody) {
    var shortenedReviewBody = reviewBody.slice(0, 251);
    var result = <div>
      <p className='reviewBody'>{shortenedReviewBody}</p>
    <button onClick={this.showFullReviewBody.bind(this)}>Show more</button>
    </div>
    return result;
  }

  render() {
    // console.log('this.props.review: ', this.props.review);
    var helpfulnessCount = this.props.helpfulness;
    var reviewBody;
    var recommendation;
    var helpfulButton;
    var photos;

    if (this.props.review.body.length > 250 && this.state.isFullReviewBodyShown === false) {
      reviewBody = this.splitReviewBody(this.props.review.body);
    } else {
      reviewBody = <p className='reviewBody'>{this.props.review.body}</p>
    }

    if (this.props.review.photos.length > 0) {
      //iterate through the photos
      photos = this.props.review.photos.map((photo, index) => {
        index += 1;
        return (
          //for each photo, return an image for the photo with a modal
          <>
            <img src={photo.url} key={photo.id} alt='' className='reviewPhotoThumbnail' onClick={this.expandModal.bind(this, index)}/>
            <div className='reviewPhotoModal'>
              <Modal isOpen={this.state[`photo${index}ModalIsOpen`]}  closeModal={this.closeModal.bind(this, index)} modalContent=
                {
                  <div className='review-photo-modal'>
                    <img src={photo.url} alt=''/>
                    <button className='reviewCloseModalButton' type='button' onClick={this.closeModal.bind(this, index)}>&times;
                    </button>
                  </div>
                }
              />
            </div>
          </>
        )
      })

    }

    if (this.props.review.recommend) {
      var string = `I recommend this product`;
      recommendation =
      <div className='reviewRecommendation'>&#10003; {string}</div>
    }

    if (this.props.review.response !== null) {
      var response = <div className='reviewResponse'>Response from seller: {`\n${this.props.review.response}`}</div>
    }

    if (this.state.helpfulButtonClicked) {
      helpfulButton = <button type='button' className='reviewHelpful' onClick={this.addToHelpfulNessCount.bind(this)} disabled><u>{this.props.review.helpfulness}</u></button>;
    } else {
      helpfulButton = <button type='button' className='reviewHelpful' onClick={this.addToHelpfulNessCount.bind(this)}><u>{this.props.review.helpfulness}</u></button>;
    }
    return (
      <div className='review' data-testid={`review${this.props.dataTestID}`}>
        <span>
          {this.generateStarsFromRating(this.props.review.rating)}
          <div className='reviewDate'>
            {this.props.review.reviewer_name}
            {', '}
            {this.formatDate(this.props.review.date)}
          </div>
          <div className='reviewSummary'><h3>{this.props.review.summary}</h3>
          </div>
          {reviewBody}
          <div className='photos'>
            {photos}
          </div>
        </span>
        {recommendation}
        {response}
        <div className='reviewHelpfulness'>
          Helpful? Yes(
            {helpfulButton}
            )
          </div>
      </div>
    )
  }
}