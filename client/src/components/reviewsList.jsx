const React = require('react')
import Review from './review.jsx';

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.reviewsList.map((review) => {
          return (<Review review={review} />)
        })}
      </div>
    )
  }
}