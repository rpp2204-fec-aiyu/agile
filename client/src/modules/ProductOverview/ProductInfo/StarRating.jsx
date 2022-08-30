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

  let roundToQuarter = (number) => {
    return parseFloat((Math.round(number * 4) / 4).toFixed(2))
  }

  return (
    <div style={{display: 'flex', height: '20px'}}>
      {[...Array(5)].map(star => {
        return (<div>&#9733;</div>)
      })}
    </div>
  )
}