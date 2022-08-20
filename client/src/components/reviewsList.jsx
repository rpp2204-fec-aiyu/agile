const React = require('react')
import Review from './review.jsx';

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {}
  }

  render() {
    console.log('here: ', this.props.reviewsList);
    return (
      <div>
        {this.props.reviewsList.map((review, index) => {
          //go through the entire list to calculate the review rating

          //only render the list of reviews we're supposed to
          if (index < this.props.reviewsToRender) {
            return (<Review review={review} />)
          }
        })}
      </div>
    )
  }
}