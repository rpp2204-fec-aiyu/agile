import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name0 : '',
      original_price0 : '',
      photo0 : '',
      rating : 0,
      liked : false,
  }

  }

  componentDidMount() {
    this.getProducts_Productid_syles();
    this.getReviews()
  }

  getProducts_Productid_syles() {
    let id = 71701;
    axios.get(`/products/${id}/styles`)
    .then((data) => {
      this.setState({
        product_id : data.data.product_id,
        name0 : data.data.results[0].name,
        original_price0 : data.data.results[0].original_price,
        photo0 : data.data.results[0].photos[0].url,
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        product_id: 71701,
      }
    })
    .then((data) => {
      let avgRating = 0;
      if (data.data.results.length >= 0) {
        for (let i = 0; i < data.data.results.length; i++) {
          avgRating += data.data.results[i].rating;
        }
        avgRating = (avgRating / data.data.results.length * 2).toFixed() / 2;
      }
      this.setState({
        rating : avgRating,
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }


  showRating(input) {
    return [...Array(5)].map((el, i) =>
    i < input && i + 1 >  input ? (
      <i key={i} className="fa fa-star-half-o" />
    ) :
    i <  input ? (
      <i key={i} className="fa fa-star" />
    ) : (
      <i key={i} className="fa fa-star-o" />
    )
  );
  }

  toggle = () => {
    let localLiked = this.state.liked;
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };

  render () {
    return (
      <div>
      <div
        className="container"
        onClick={() => this.toggle()}
      >
        {this.state.liked === false ? (
         <i className="fa fa-star-o" />
        ) : (
          <i className="fa fa-star" />
        )}
      </div>
      <div>
     <img src={this.state.photo0} />
     </div>
     CATEGORY
     <div>
       {this.state.name0}
     </div>
     <div>
       ${this.state.original_price0}
     </div>

    { this.showRating(this.state.rating)}

  </div>
    )
  }

}



