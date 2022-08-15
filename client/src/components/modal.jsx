const React = require('react')
import ReactModal from 'react-modal';
import Stars from './stars.jsx';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  validateInputFields() {

  }

  handleAddReviewSubmitClick() {
    //call validation function to see if all fields were correctly filled out
      //if so, continue
      //if not, do not continue and give user input
    //call an addNewReview function that takes in information from modal to make post call to API - investigate how to get information from modal
    //call closeModal function
    this.props.closeModal();
  }

  render() {

    ReactModal.setAppElement('#app');

    return (
      <div>
        <ReactModal isOpen={this.props.isOpen} contentLabel="Modal"
        >
          <h2>Write Your Review</h2>
          <h3>About the [INSERT PRODUCT NAME HERE]</h3>
          <h4>Overall rating</h4>
          <div>
            <Stars/>
          </div>
          <h4>Do you recommend this product?</h4>
          <h4>Characteristics</h4>
          <h4>Review summary</h4>
          <h4>Review body</h4>
          <h4>Upload your photos</h4>
          <h4>What is your nickname</h4>
          <h4>Your email</h4>

          <button onClick={this.handleAddReviewSubmitClick.bind(this)}>Submit review</button>
        </ReactModal>
      </div>
    )
  }
}