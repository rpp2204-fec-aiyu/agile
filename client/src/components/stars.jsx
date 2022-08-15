const React = require('react')

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating: null, isRated: false}
  }

  onStarClick(starRating) {
    console.log('starRating: ', starRating);
    this.setState({rating: starRating});
    //check to see what star was clicked
    //change color of star# and all those less than star# to yello
    //change rating state to be the star chosen
  }

  render() {

    return (
      <div className='starRating'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
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