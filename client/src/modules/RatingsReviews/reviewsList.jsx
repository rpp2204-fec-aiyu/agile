const React = require('react')
import Review from './review.jsx';

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {}
  }

  render() {
    console.log('reviewsList: ', this.props.reviewsList);
    return (
      <div id='reviews-container'>
        {this.props.reviewsList.map((review, index) => {
          if (index < this.props.reviewsToRender) {
            return (<Review review={review} key={review.review_id} getReviewsList={this.props.getReviewsList} dataTestID={index + 1}/>)
          }
        })}
      </div>
    )
  }
}