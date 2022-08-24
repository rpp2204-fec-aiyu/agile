const React = require('react')

export default class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculateAvgRating() {
    var ratings = this.props.ratings;
    var sum = 0;
    for (var key in ratings) {
      ratings[key] = parseInt(ratings[key]);
      sum += ratings[key] * parseInt(key);
    }
    var count = (ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5']);
    console.log('count: ', count);
    console.log('sum: ', sum);
    var average = sum / count;
    return average;
  }

  generateStarsFromRating() {
    var average = this.calculateAvgRating();
    console.log('average: ', average);
    var stars =
    <div className='rating'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              className={`starButton ${index <= average ? 'on' : 'off'}`}
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

  render() {
    return (
      <div id='ratingSummary'>
        <h3>RATINGS &amp; REVIEWS</h3>
        <h1>{this.generateStarsFromRating()}</h1>
      </div>
    )
  }
}
