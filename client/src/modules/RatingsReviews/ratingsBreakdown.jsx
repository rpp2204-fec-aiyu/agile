const React = require('react')
import starImg from '../../../assets/star.png';

export default class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculateNearestQuarter(num) {
    var int = Math.trunc(num);
    var dec = num - int;
    var result = 0;

    if (dec >= 0 && dec < 0.125) {
      result = int + 0;
    } else if (dec >= 0.125 && dec < 0.375) {
      result = int + 0.25;
    } else if (dec >= 0.375 && dec < 0.625) {
      result = int + 0.5;
    } else if (dec >= 0.625 && dec < 0.875) {
      result = int + 0.75;
    } else if (dec >= 0.875 && dec < 1) {
      result = int + 1;
    }

    return result;

  }

  calculateNearestTenth(num) {
    var int = Math.trunc(num);
    var dec = num - int;
    var result = 0;

    if (dec >= 0 && dec < 0.05) {
      result = int + 0;
    } else if (dec >= 0.05 && dec < 0.15) {
      result = int + 0.1;
    } else if (dec >= 0.15 && dec < 0.25) {
      result = int + 0.2;
    } else if (dec >= 0.25 && dec < 0.35) {
      result = int + 0.3;
    } else if (dec >= 0.35 && dec < 0.45) {
      result = int + 0.4;
    } else if (dec >= 0.45 && dec < 0.55) {
      result = int + 0.5;
    } else if (dec >= 0.55 && dec < 0.65) {
      result = int + 0.6;
    } else if (dec >= 0.65 && dec < 0.75) {
      result = int + 0.7;
    } else if (dec >= 0.75 && dec < 0.85) {
      result = int + 0.8;
    } else if (dec >= 0.85 && dec < 0.95) {
      result = int + 0.9;
    } else if (dec >= 0.95 && dec < 1) {
      result = int + 1;
    }

    return result;

  }

  getCountOfRatings() {
    var ratings = this.props.ratings;
    var count = (ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5']);
    return count;
  }

  calculateAvgRating(roundToQuarter) {
    var ratings = this.props.ratings;
    var sum = 0;
    var count = 0;

    for (var key in ratings) {
      ratings[key] = parseInt(ratings[key]);
      sum += ratings[key] * parseInt(key);
    }

    count = this.getCountOfRatings();
    var average = sum / count;

    if (roundToQuarter === true) {
      average = this.calculateNearestQuarter(average);
    } else {
      average = this.calculateNearestTenth(average);
    }
    return average;
  }

  generateStarWidths() {
    var average = this.calculateAvgRating(true);
    var widthsOfStars = [...Array(5)].map((rating, index) => {
      if (average > 1) {
        average = average - 1;
        return 1;
      } else if (average > 0) {
        var roundedDec = average;
        average = average - average;
        return roundedDec
      } else {
        return 0;
      }
    })
    return widthsOfStars;
  }

  generateStarsFromRating() {
    var arrayOfWidths = this.generateStarWidths();
    return (
    <div id='reviewsQuarterStars'>
      {arrayOfWidths.map((width, index) => {
        return (
        <div className='single-star-container' key={index}>
          <div className='single-star-fill' style={{'width': (width * 31).toString() + 'px'}}>
            <img className='single-star-outline' src={starImg}></img>
          </div>
        </div>
        )
      })}
    </div>
    )
  }

  handleRatingFilterClick(e) {
    var filterBy = this.props.filterBy;
    var ratingNum = e.currentTarget.className[0];

    if (filterBy[ratingNum]) {
      this.props.removeFilters(parseInt(ratingNum), false);
    } else {
      this.props.applyFilters(parseInt(ratingNum));
    }
  }

  calculateRatingsBar(ratingNum) {
    var width = ratingNum / this.getCountOfRatings() * 100;
    return width.toString() + '%'
  }

  getRatingsBreakdown() {
    var ratings = this.props.ratings;
    var counter = 6;
    var rows = [...Array(5)].map((row, index) => {
      counter--;
      return (
        <div className={`${counter}-star-row`} data-testid={`${counter}-rating-filter`} onClick={this.handleRatingFilterClick.bind(this)}>
          <div className='side' key={index}>
            <div>{counter} stars</div>
          </div>
          <div className='middle'>
            <div className='bar-container'>
              <div className={`bar-${counter}`} style={{ width: this.calculateRatingsBar(ratings[counter]) }}></div>
            </div>
          </div>
          <div className='side right'>
            <div>{ratings[counter]}</div>
          </div>
        </div>
      )
    })
    return rows;
  }

  generateFiltersMessage() {
    var filtersObj = this.props.filterBy;
    var filtersApplied = '';
    for (var key in filtersObj) {
      if (filtersObj[key]) {
        if (filtersApplied.length === 0) {
          filtersApplied += `Filtered by ${key} rating`;
        } else {
          filtersApplied += `; Filtered by ${key} rating`
        }
      }
    }
    return filtersApplied;
  }

  handleTurnOffFiltersClick() {
    this.props.removeFilters(undefined, true);
  }

  render() {
    if (!this.props.recommendations.true) {
      var doesRecommend = 0;
    }
    if (!this.props.recommendations.true) {
      var doesNotRecommend = 0;
    }

    var doesRecommend = parseInt(this.props.recommendations.true);
    var doesNotRecommend = parseInt(this.props.recommendations.false);
    var percentRecommends = doesRecommend / (doesRecommend + doesNotRecommend) * 100;

    var filtersObj = this.state.filterBy;
    var removeFiltersButton;
    var filtersApplied = this.generateFiltersMessage();
    var filtersMessage = <div id='ratings-filters'>{filtersApplied}</div>

    if (filtersApplied.length > 0)  {
      removeFiltersButton =
      <button type='button' id='remove-rating-filters' onClick={this.handleTurnOffFiltersClick.bind(this)}>Remove all filters</button>
    }

    return (
      <div id='ratingsBreakdown'>
        <div id='ratingsSummary'>
          <h1 id='averageNumRating'>{this.calculateAvgRating()}</h1>
          {this.generateStarsFromRating()}
        </div>
        <div id='productRecommendation'>
          {`${Math.round(percentRecommends)}% of reviewers recommend this product`}
        </div>
        {filtersMessage}
        {removeFiltersButton}
        <p>based on {this.getCountOfRatings()} reviews</p>
        <div id='ratingBreakdown'>
          <div className='row'>
            {this.getRatingsBreakdown()}
          </div>
        </div>
      </div>
    )
  }
}
