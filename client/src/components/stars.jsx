const React = require('react')

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating: 0}
  }

  onStarClick(starRating) {
    console.log('starRating: ', starRating);
    this.setState({rating: starRating});
    this.props.starCount(starRating);
  }

  render() {
    return (
      <div className='stars'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              className={`starButton ${index <= this.state.rating ? 'on' : 'off'}`}
              type="button"
              key={index}
              onClick={this.onStarClick.bind(this, index)}>
              <span className={`star${index.toString()}`}>&#9733;
              </span>
            </button>
          );
        })}
      </div>
    )
  }
}