const React = require('react')
import Stars from './stars.jsx';
const axios = require('axios');
import Modal from './modal.jsx';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFullReviewBodyShown: false, helpfulnessCount: this.props.review.helpfulness, helpfulButtonClicked: false, 'photo1ModalIsOpen': false, 'photo2ModalIsOpen': false, 'photo3ModalIsOpen': false, 'photo4ModalIsOpen': false, 'photo5ModalIsOpen': false}
  }

  expandModal(photoNum) {
    console.log('photoNum: ', photoNum);
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
    console.log('modal closed');
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

  generateStarsFromRating(rating) {
    var stars =
    <div className='rating'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              className={`starButton ${index <= rating ? 'on' : 'off'}`}
              type="button"
              key={index}
              >
              <span>&#9733;
              </span>
            </button>
          );
        })}
      </div>
    return stars;
  }

  addToHelpfulNessCount() {

    axios.put(`http://localhost:3000/reviews/${this.props.review.review_id}/helpful`)
    .then((response) => {
      console.log('response from marking review as helpful in /review/:review_id/helpful: ', 'success');
      this.setState({helpfulnessCount: this.state.helpfulnessCount + 1, helpfulButtonClicked: true});
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
    //O:
      //shortened review body of 250 characters
      //a 'Show more' clickable link to expand body to full display
    var shortenedReviewBody = reviewBody.slice(0, 251);
    var result = <div>
      <p className='reviewBody'>{shortenedReviewBody}</p>
    <button onClick={this.showFullReviewBody.bind(this)}>Show more</button>
    </div>
    return result;
  }

  render() {
    console.log('this.props.review: ', this.props.review);
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
      console.log('this.state[`photo${index}ModalIsOpen`]: ', this.state[`photo1ModalIsOpen`]);
      console.log('this.state[`photo${index}ModalIsOpen`]: ', this.state.photo1ModalIsOpen);
      photos = this.props.review.photos.map((photo, index) => {
        index += 1;
        return (
          //for each photo, return an image for the photo with a modal
          <div className='photo'>
            <img src={photo.url} key={photo.id} className='reviewPhotoThumbnail' onClick={this.expandModal.bind(this, index)}/>
            <div className='reviewPhotoModal'>
              <Modal isOpen={this.state[`photo${index}ModalIsOpen`]}  closeModal={this.closeModal.bind(this, index)} modalContent=
                {
                  <div>
                    <img src={photo.url}/>
                    <button type='button' onClick={this.closeModal.bind(this, index)}>Exit
                    </button>
                  </div>
                }
              />
            </div>
          </div>
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
      helpfulButton = <button type='button' className='reviewHelpful' onClick={this.addToHelpfulNessCount.bind(this)} disabled><u>{this.state.helpfulnessCount}</u></button>;
    } else {
      helpfulButton = <button type='button' className='reviewHelpful' onClick={this.addToHelpfulNessCount.bind(this)}><u>{this.state.helpfulnessCount}</u></button>;
    }

    return (
      <div>
        <span>
          {this.generateStarsFromRating(this.props.review.rating)}
          <div className='reviewDate'>
            {this.formatDate(this.props.review.date)}
          </div>
          <span className='reviewSummary'><b>{this.props.review.summary}</b>
          </span>
          {reviewBody}
          {photos.map((photo) => { return photo; })}
        </span>
        {recommendation}
        <p className='reviewUserName'>{this.props.review.reviewer_name}</p>
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