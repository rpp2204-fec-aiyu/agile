const React = require('react')
import Stars from './stars.jsx';

export default class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recommends: null, size: null, width: null, comfort: null, quality: null, length: null, fit: null, reviewSummaryValue: '', reviewBodyValue: '', emailValue: '', nickname: ''};
    this.rating;
  }

  getStarCount(rating) {
    this.rating = rating;
    console.log('this.rating: ', this.rating);
  }

  captureRecommendInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({recommends: event.target.value});
    event.preventDefault();
  }

  captureSizeInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({size: event.target.value});
  }

  captureWidthInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({width: event.target.value});
  }

  captureComfortInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({comfort: event.target.value});
  }

  captureQualityInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({quality: event.target.value});
  }

  captureLengthInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({length: event.target.value});
  }

  captureFitInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({fit: event.target.value});
  }

  handleReviewSummaryChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nreviewSummary text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({reviewSummaryValue: event.target.value});
    }
  }

  handleReviewBodyChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nreviewBody text length: ', event.target.value.length)
    if (event.target.value.length <= 999) {
      this.setState({reviewBodyValue: event.target.value});
    }
  }

  handleEmailChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nemail text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({emailValue: event.target.value});
    }
  }

  handleNicknameChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nnickname text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({nickname: event.target.value});
    }
  }

  validateInputFields() {
    if (this.state.reviewBodyValue.length < 50) {
      //this is a mandatory req
    }
    if (this.state.emailValue.length === 0) {
      //this is a mandatory req
    }
    if (this.state.nickname.length === 0) {
      //this is a mandatory req
    }
  }

  handleAddReviewSubmitClick() {
    //call validation function to see if all fields were correctly filled out
      //if so, continue
      //if not, do not continue and give user input
    //call an addNewReview function that takes in information from modal to make post call to API - investigate how to get information from modal
    //call closeModal function
    this.props.closeModal();
  }

  generateCharacteristicsInput(characteristicName, oneDescription, twoDescription) {
    var callback;

    if (characteristicName === 'Size') {
      callback = this.captureSizeInput.bind(this);
    } else if (characteristicName === 'Width') {
      callback = this.captureWidthInput.bind(this);
    } else if (characteristicName === 'Comfort') {
      callback = this.captureComfortInput.bind(this);
    } else if (characteristicName === 'Quality') {
      callback = this.captureQualityInput.bind(this);
    } else if (characteristicName === 'Length') {
      callback = this.captureLengthInput.bind(this);
    } else if (characteristicName === 'Fit') {
      callback = this.captureFitInput.bind(this);
    }

    return (
      <div onChange={callback}>
        <h5>{`${characteristicName}`}</h5>
        {[...Array(5)].map((input, index) => {
          index += 1;
          return (
            <span>
              <input type='radio' id={`${characteristicName}`} value={`${index}`} name={`${characteristicName}`} key={`${index}`}></input>
              <label for={`${characteristicName}`}>{`${index}`}</label>
            </span>
          )
        })}
        <p>{`1 = ${oneDescription}; 5 = ${twoDescription}`}</p>
      </div>
    )
  }

  render() {
    var reviewBodyCharCountMessage;
    var counter = 50 - this.state.reviewBodyValue.length
    if (counter > 0) {
      reviewBodyCharCountMessage = `Minimum required characters left: ${counter}`;
    } else {
      reviewBodyCharCountMessage = 'Minimum reached';
    }
    return (
      <div>
          <h2>Write Your Review</h2>
          <h3>About the [INSERT PRODUCT NAME HERE]</h3>
          <h4>Overall rating</h4>
          <div>
            <Stars starCount={this.getStarCount.bind(this)}/>
          </div>
          <h4>Do you recommend this product?</h4>
          <div onChange={this.captureRecommendInput.bind(this)}>
            <input type='radio' id='doesRecommend' value='Yes' name='recommends' checked></input>
            <label for='doesRecommend'>Yes</label>
            <input type='radio' id='doesNotRecommend' value='No' name='recommends'></input>
            <label for='doesNotRecommend'>No</label>
          </div>
          <h4>Characteristics</h4>
          {this.generateCharacteristicsInput('Size', 'A size too small', 'A size too big')}
          {this.generateCharacteristicsInput('Width', 'Too narrow', 'Too wide')}
          {this.generateCharacteristicsInput('Comfort', 'Uncomfortable', 'Perfect')}
          {this.generateCharacteristicsInput('Quality', 'Poor', 'Perfect')}
          {this.generateCharacteristicsInput('Length', 'Runs Short', 'Runs Long')}
          {this.generateCharacteristicsInput('Fit', 'Runs tight', 'Runs long')}
          <h4>Review summary</h4>
            <form onSumbit={this.handleAddReviewSubmitClick.bind(this)}>
              <textarea placeholder='Example: Best purchase ever!' value={this.state.reviewSummaryValue} onChange={this.handleReviewSummaryChange.bind(this)}>
              </textarea>
            </form>
          <h4>Review body</h4>
            <form onSumbit={this.handleAddReviewSubmitClick.bind(this)}>
                <textarea placeholder='Why did you like the product or not?' value={this.state.reviewBodyValue} onChange={this.handleReviewBodyChange.bind(this)}>
                </textarea>
            </form>
            <p>{reviewBodyCharCountMessage}</p>
          <h4>Upload your photos</h4>
          <h4>What is your nickname</h4>
            <form onSubmit={this.handleAddReviewSubmitClick.bind(this)}>
                <input type="text" placeholder='Example: jackson11!' value={this.state.nickname} onChange={this.handleNicknameChange.bind(this)}></input>
                <p>For privacy reasons, do not use your full name or email address</p>
            </form>
          <h4>Your email</h4>
            <form onSubmit={this.handleAddReviewSubmitClick.bind(this)}>
                <input type="text" placeholder='Example: jackson11@email.com' value={this.state.emailValue} onChange={this.handleEmailChange.bind(this)}></input>
                <p>For authentication reasons, you will not be emailed</p>
            </form>
          <button onClick={this.handleAddReviewSubmitClick.bind(this)}>Submit review</button>
      </div>
    )
  }
}