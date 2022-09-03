import React from 'react'

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

  function generateStarsFromRating(rating) {
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

  return generateStarsFromRating(roundedAvg)
    // (
    // <div style={{display: 'flex', height: '20px'}}>
    //   {[...Array(5)].map(star => {
    //     return (<div>&#9733;</div>)
    //   })}
    // </div>
    // )

}