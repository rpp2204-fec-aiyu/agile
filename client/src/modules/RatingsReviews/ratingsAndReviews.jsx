const React = require('react')
const axios = require('axios');
import ReviewsList from './reviewsList.jsx';
import Modal from './modal.jsx';
import NewReview from './newReview.jsx';
import SortReview from './sortReviews.jsx';
import SearchReview from './searchReviews.jsx';
import RatingsBreakdown from './ratingsBreakdown.jsx';
import ProductBreakdown from './productBreakdown.jsx';


export default class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], reviewsToRender: 2, modalIsOpen: false, productRatings: {}, productRecommendations: {}, searchTerm: '', productSizeMetaData: undefined, productQualityMetaData: undefined, productComfortMetaData: undefined, productWidthMetaData: undefined, productLengthMetaData: undefined, productFitMetaData: undefined, sortOrder: 'relevant', filterBy: {'5': false, '4': false, '3': false, '2': false, '1': false}}
  }

  componentDidMount() {
    this.getReviewsList(this.state.sortOrder);
    this.getReviewMetaData();
  }

  getReviewsList(sortOrder) {
    if (sortOrder === undefined) {
      sortOrder = this.state.sortOrder;
    }
    axios.get('http://localhost:3000/reviews', {
      params: {
        product_id: this.props.product_id,
        sort: sortOrder,
        count: 100
      }
    })
      .then((response) => {
        this.setState({reviews: response.data.results, 'sortOrder': sortOrder});
      })
      .catch((err) => {
        throw err;
      })
  }

  getReviewsPromise(sortOrder) {
    //if sortOrder is defined
      //use it for the sort parameter
    //otherwise
      //use state
    var sortOrder = sortOrder !== undefined ? sortOrder : this.state.sortOrder;
    return (
      axios.get('http://localhost:3000/reviews', {
        params: {
          product_id: this.props.product_id,
          sort: sortOrder,
          count: 100
        }
      })
    )
  }

  sortReviews(sortOrder) {
    var filterList = this.checkFilters();

    filterList.forEach((ratingNum) => {
      this.setState((prevState) => {
        var newState = {};
        console.log('prevState.filterBy: ', prevState.filterBy);
        for (var key in prevState.filterBy) {
          newState[key] = false;
        }
        return {filterBy: newState};
      })
    })
    this.getReviewsPromise(sortOrder)
        .then((response) => {
          this.setState({reviews: response.data.results});
          //filter by searchTerm if applicable
          if (this.state.searchTerm.length >= 3) {
            console.log('if all rating filters are removed, refresh reviews and filter by existing in place searchTerm');
            console.log('this.state.searchTerm: ', this.state.searchTerm);
            this.filterReviewsBySearchTerm(this.state.searchTerm);
          }
        })
        .catch((err) => { throw err; })
  }

  searchReviews(e) {
    //purpose:
      //sets searchKeyword state
      //iterates through existing reviews state and filters out non-matched reviews

    //O: n/a
    //I: search terms that get updated from searchReviews
    //C:
    //E:
      //must expand and contract reviews state without refreshing the list
      //changes to the sort and rating filters should not remove the search term filter

    console.log('e.target.value: ', e.target.value);

   //if there's already a searchTerm applied, and the current searchTerm is different/shorter, reset state and refresh reviews before filtering
   if (this.state.searchTerm.length >= 3 && (this.state.searchTerm.length - e.target.value.length > 0)) {
    console.log('this.state.searchTerm is greater or equal to 3');
    console.log('this.state.searchTerm.length - e.target.value.length > 0');
     //update searchTerm state to current event
     this.setState({searchTerm: e.target.value});
     //invoke this.applyFilters() to refresh reviews list with the existing fitlers
     this.applyFilters();
   } else if (this.state.searchTerm.length >= 3 && (e.target.value.length - this.state.searchTerm.length > 0)) {
   //if there's already a searchTerm applied, and the current searchTerm is longer, reset state and filter the existing filtered reviews
     //set searchTerm state to be equal to the event
     this.setState({searchTerm: e.target.value});
     this.filterReviewsBySearchTerm(e.target.value);
     //filtering by the existing review list
   } else if (e.target.value.length < 3) {
    //if the current searchTerm is less than 3 characters, apply no searchTerm, but set state to current searchTerm
      //do nothing
      this.setState({searchTerm: e.target.value});
      console.log('current searchTerm is less than 3 chars so set new state and do nothing');

    } else if (e.target.value.length === 3) {
      this.setState({searchTerm: e.target.value});
      this.filterReviewsBySearchTerm(e.target.value);
    }
  }

  filterReviewsBySearchTerm(searchTerm) {
      var filteredReviewList = this.state.reviews.filter((review) => {
        // console.log('review: ', review);
        if (review.summary.indexOf(searchTerm) !== -1 || review.body.indexOf(searchTerm) !== -1) { //if searchTerm is found in a review, add it to filteredReviewList
          return review;
        }
      })
      console.log('this.state.reviews after searchTerm filtering and ratingNum filtering, if applicable: ', filteredReviewList);
      console.log('reviews should also be filtered by ratingNums if the followin this.state.filterBy object has true values: ', this.state.filterBy);
      this.setState({reviews: filteredReviewList});
  }

  checkFilters() {
    var filterList = [];
    //check to see which if any of the filters are enabled
    for (var key in this.state.filterBy) {
      if (this.state.filterBy[key]) {
        filterList.push(parseInt(key));
      }
    }
    return filterList;
  }

  applyFilterLogic(reviewList, filterList) {
    var filteredReviewList = reviewList.filter((review) => {
      // console.log('filterList: ', filterList);
      // console.log('review.rating: ', review.rating);
      if (filterList.indexOf(review.rating) !== -1) { //if rating is found in filterList, add it to filteredReviewList
        return review;
      }
    })
    this.setState({reviews: filteredReviewList});
  }

  applyFilters(ratingNum, arrayOfRatings) {
    var reviewsList;
    var filterList = arrayOfRatings !== undefined ? arrayOfRatings : this.checkFilters();

    //if ratingNum is defined, add it to filterBy state
    if (ratingNum !== undefined) {
      console.log(`filter by ${ratingNum}`);
      this.setState((prevState) => {
        var newState = {};
        for (var key in prevState.filterBy) {
          if (key === ratingNum.toString()) {
            //set filterBy.ratingNum to true
            newState[ratingNum] = true;
          } else {
            newState[key] = prevState.filterBy[key];
          }
        }
        return {filterBy: newState};
      })
      filterList.push(parseInt(ratingNum));
    }
    //if at least one filter was already applied before this func was invoked, fetch a new list of reviews to filter from
    if (filterList.length >= 1) {
      this.getReviewsPromise()
        .then((response) => {
          this.applyFilterLogic(response.data.results, filterList);
          if (this.state.searchTerm.length >= 3) {
            console.log('if rating filter exists, refresh reviews and filter by existing in place searchTerm');
            this.filterReviewsBySearchTerm(this.state.searchTerm);
          }
        })
        .catch((err) => {
          throw err;
        })
    } else if (ratingNum !== undefined) { //if the first filter, avoid API call since reviews are already unfiltered
      this.applyFilterLogic(this.state.reviews, filterList);
    } else if (filterList.length === 0 && ratingNum === undefined) { //if the last filter was removed
      this.getReviewsPromise()
        .then((response) => {
          this.setState({reviews: response.data.results});
          if (this.state.searchTerm.length >= 3) {
            console.log('if last rating filter is removed, refresh reviews and filter by existing in place searchTerm');
            console.log('this.state.searchTerm: ', this.state.searchTerm);
            this.filterReviewsBySearchTerm(this.state.searchTerm);
          }
        })
        .catch((err) => {
          throw err;
        })
    } else {
      new Error('ApplyFilters did not work as expected');
    }
  }

  removeFilters(ratingNum, turnOffAllFilters) {
    var filterList = this.checkFilters();

    //if turnOffAllFilters is true AND filterList is not empty
    if (turnOffAllFilters) {
      //make a call to this.getReviewsList to refresh the reviews state
      this.getReviewsPromise()
        .then((response) => {
          this.setState({reviews: response.data.results});
          //filter by searchTerm if applicable
          if (this.state.searchTerm.length >= 3) {
            console.log('if all rating filters are removed, refresh reviews and filter by existing in place searchTerm');
            console.log('this.state.searchTerm: ', this.state.searchTerm);
            this.filterReviewsBySearchTerm(this.state.searchTerm);
          }
        })
        .catch((err) => { throw err });
      //turn off applicable filterBy states using elements in filterList
      filterList.forEach((ratingNum) => {
        this.setState((prevState) => {
          var newState = {};
          console.log('prevState.filterBy2: ', prevState.filterBy);
          for (var key in prevState.filterBy) {
            newState[key] = false;
          }
          return {filterBy: newState};
        })
      })
    }

    //if ratingNum is defined
    if (ratingNum !== undefined) {
      //remove the filterBy state for ratingNum only
      var newState = {};
      this.setState((prevState) => {
        for (var key in prevState.filterBy) {
          if (parseInt(key) === ratingNum) {
            newState[key] = false;
          } else {
            console.log('key: ', key);
            console.log('prevState.filterBy[key]: ', prevState.filterBy[key]);
            newState[key] = prevState.filterBy[key];
          }
        }
        return { filterBy: newState };
      }, () => {
        var filterList = [];
        for (var key in newState) {
          if (newState[key]) {
            filterList.push(parseInt(key));
          }
        }
        // console.log(`filterList should not contain recently removed ratingNum of ${ratingNum}: `, filterList);
        this.applyFilters(undefined, filterList);
      })
    }
  }

  onAddReviewButtonClick() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  loadMoreReviews() {
    this.setState({reviewsToRender: this.state.reviewsToRender + 2});
  }

  getReviewMetaData(review_id) {
    axios.get('http://localhost:3000/reviews/meta', {
      params: {product_id: this.props.product_id}
    })
      .then((response) => {
        this.setState({
          productRatings: response.data.ratings,
          productRecommendations: response.data.recommended,
          productSizeMetaData: response.data.characteristics.Size,
          productWidthMetaData: response.data.characteristics.Width,
          productComfortMetaData: response.data.characteristics.Comfort,
          productQualityMetaData: response.data.characteristics.Quality,
          productFitMetaData: response.data.characteristics.Fit,
          productLengthMetaData: response.data.characteristics.Length
        });
      })
      .catch((err) => {
        throw err;
      })
  }

  translateCharacteristicsToIds(characteristicsObj) {
    var {size, width, comfort, quality, length, fit} = characteristicsObj;

    var results = {};
    if (this.state.productSizeMetaData !== undefined) {
      results[this.state.productSizeMetaData.id] = size;
    }
    if (this.state.productQualityMetaData !== undefined) {
      results[this.state.productQualityMetaData.id] = quality;
    }
    if (this.state.productComfortMetaData !== undefined) {
      results[this.state.productComfortMetaData.id] = comfort;
    }
    if (this.state.productWidthMetaData !== undefined) {
      results[this.state.productWidthMetaData.id] = width;
    }
    if (this.state.productLengthMetaData !== undefined) {
      results[this.state.productLengthMetaData.id] = length;
    }
    if (this.state.productFitMetaData !== undefined) {
      results[this.state.productFitMetaData.id] = fit;
    }
    console.log('characteristics obj to send to Post to /reviews: ', results);
    return results;
  }

  addNewReview(newReview) {
    var {rating, recommends, characteristics, reviewSummaryValue, reviewBodyValue, emailValue, nickname, modalIsOpen, photos} = newReview

    characteristics = this.translateCharacteristicsToIds(characteristics);

    recommends = recommends === 'Yes' ? true : false;

    var requestBody = {
        'product_id': this.props.product_id,
        'rating': rating,
        'summary': reviewSummaryValue,
        'body': reviewBodyValue,
        'recommend': recommends,
        'name': nickname,
        'email': emailValue,
        'photos': photos,
        'characteristics': characteristics
    };

    console.log('requestBody: ', requestBody);

    axios.post('http://localhost:3000/reviews', {
      data: {
        'product_id': this.props.product_id,
        'rating': rating,
        'summary': reviewSummaryValue,
        'body': reviewBodyValue,
        'recommend': recommends,
        'name': nickname,
        'email': emailValue,
        'rawPhotos': photos,
        'characteristics': characteristics
      }
    })
      .then((response) => {
        console.log('response.data: ', response.data);
        this.getReviewsList(this.state.sortOrder);
        //update reviewsMetadata
        this.getReviewMetaData();
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    var closeModalButton =
      <button
        type="button"
        className="newReviewCloseButton"
        data-dismiss="modal"
        aria-label="Close"
        onClick={this.closeModal.bind(this)}>&times;
      </button>

    if (this.state.reviews.length - this.state.reviewsToRender >= 1) {
      var moreReviewsButton = <button onClick={this.loadMoreReviews.bind(this)}>MORE REVIEWS</button>
    }

    return (
      <div id='ratingsAndReviews'>
        <div id='ratingsAndReviewsHeader'>
        <h3>RATINGS &amp; REVIEWS</h3>
        </div>
        <>
          <RatingsBreakdown ratings={this.state.productRatings} recommendations={this.state.productRecommendations}  applyFilters={this.applyFilters.bind(this)} removeFilters={this.removeFilters.bind(this)} filterBy={this.state.filterBy}/>
        </>
        <div id='productBreakdown'>
          <ProductBreakdown reviews={this.state.reviews} productSizeMetaData={this.state.productSizeMetaData} productQualityMetaData={this.state.productQualityMetaData} productComfortMetaData={this.state.productComfortMetaData} productWidthMetaData={this.state.productWidthMetaData} productLengthMetaData={this.state.productLengthMetaData} productFitMetaData={this.state.productFitMetaData} />
        </div>
        <div id='reviewsList'>
          <div id='reviewListSearch'>
            <input type='search' onChange={this.searchReviews.bind(this)} placeholder="Search reviews"></input>
          </div>
          <div id='reviewListSort'>
            <SortReview sortReviews={this.sortReviews.bind(this)} />
          </div>
          <ReviewsList reviewsList={this.state.reviews} reviewsToRender={this.state.reviewsToRender} getReviewsList={this.getReviewsList.bind(this)} />
          {moreReviewsButton}
          <button onClick={this.onAddReviewButtonClick.bind(this)}>ADD A REVIEW +</button>
          <>
            <Modal isOpen={this.state.modalIsOpen} modalContent={<NewReview closeModalButton={closeModalButton} closeModal= {this.closeModal.bind(this)} addNewReview={this.addNewReview.bind(this)} productName={this.props.product.name} productSizeMetaData={this.state.productSizeMetaData} productQualityMetaData={this.state.productQualityMetaData} productComfortMetaData={this.state.productComfortMetaData} productWidthMetaData={this.state.productWidthMetaData} productLengthMetaData={this.state.productLengthMetaData} productFitMetaData={this.state.productFitMetaData} />} />
          </>
        </div>
      </div>
    )
  }
}