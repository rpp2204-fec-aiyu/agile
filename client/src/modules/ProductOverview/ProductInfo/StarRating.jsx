import React from 'react'
import starImg from '../../../../assets/star.png';

export default function StarRating(props) {

  let ratings = props.reviews.reduce((memo, val) => {
    memo.ratingsTotal = memo.ratingsTotal + (val[0] * val[1])
    memo.totalReviews = memo.totalReviews + Number(val[1])
    return memo
  }, {ratingsTotal: 0, totalReviews: 0})
  console.log(ratings)

  let avg = ratings.ratingsTotal / ratings.totalReviews
  console.log('AVG', avg)

  function roundToQuarter(number)  {
    return parseFloat((Math.round(number * 4) / 4).toFixed(2))
  }

  let roundedAvg = roundToQuarter(avg)
  console.log('ROUNDED AVG', roundedAvg)

  // function generateStarsFromRating(rating) {
  //   var stars =
  //   <div className='rating'>
  //       {[...Array(5)].map((star, index) => {
  //         index += 1;
  //         return (
  //           <button
  //             className={`starButton ${index <= rating ? 'on' : 'off'}`}
  //             type="button"
  //             key={index}
  //             >
  //             <span>&#9733;
  //             </span>
  //           </button>
  //         );
  //       })}
  //     </div>
  //   return stars;
  // }

  function generateStarWidths() {
    var widthsOfStars = [...Array(5)].map((rating, index) => {
      if (roundedAvg > 1) {
        roundedAvg = roundedAvg - 1;
        return 1;
      } else if (roundedAvg > 0) {
        var roundedDec = roundedAvg;
        roundedAvg = roundedAvg - roundedAvg;
        return roundedDec
      } else {
        return 0;
      }
    })
    return widthsOfStars;
  }

  function generateStarsFromRating() {
    var arrayOfWidths = generateStarWidths();
    console.log('arrayOfWidths: ', arrayOfWidths);
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

  return (
    <div>
      {generateStarsFromRating()}
      <a href='#ratingsAndReviews'><small>Read all {ratings.totalReviews} reviews</small></a>
    </div>
  )
    // (
    // <div style={{display: 'flex', height: '20px'}}>
    //   {[...Array(5)].map(star => {
    //     return (<div>&#9733;</div>)
    //   })}
    // </div>
    // )

}