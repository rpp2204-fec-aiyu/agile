const React = require('react')
import Stars from './stars.jsx';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFullReviewBodyShown: false}
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
    var reviewBody;
    var recommendation;

    if (this.props.review.body.length > 250 && this.state.isFullReviewBodyShown === false) {
      reviewBody = this.splitReviewBody(this.props.review.body);
    } else {
      reviewBody = <p className='reviewBody'>{this.props.review.body}</p>
    }

    if (this.props.review.recommend) {
      var string = `I recommend this product`;
      recommendation =
      <div className='reviewRecommendation'>&#10003; {string}</div>
    }

    if (this.props.review.response !== null) {
      var response = <div className='reviewResponse'>Response from seller: {`\n${this.props.review.response}`}</div>
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
        </span>
        {recommendation}
        <p className='reviewUserName'>{this.props.review.reviewer_name}</p>
        {response}
        <div className='reviewHelpfulness'>
          <a></a>
          Helpful? Yes({this.props.review.helpfulness})</div>
      </div>
    )
  }
}