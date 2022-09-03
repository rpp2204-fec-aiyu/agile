import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddAnsForm = ({onHide, product, question}) => {
  const [ansFormValues, setAnsFormValues] = useState({
    ansBody: "",
    nickName: "",
    email: ""
  });

  const [photos, setPhotos] = useState([]);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setAnsFormValues({
      ...ansFormValues,
      [e.target.name]: e.target.value
    });
  };

  const multiplePhotosChange = (e) => {
    setPhotos(e.target.files);
    console.log('IMAGES:', e.target.files);
  }

  const handleSubmit = () => {
    console.log('HERE ARE SUBMITED ANS:', ansFormValues.ansBody )
    console.log('HERE ARE THE PHOTOS:', photos);
    setFormError(validation(ansFormValues));
    setIsSubmit(true);
  }

  const validation = (ansValues) => {
    const errors = {};
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!ansValues.ansBody) {
      errors.ansBody = 'Question is required!';
    }

    if(!ansValues.nickName) {
      errors.nickName = 'Nickname is required!';
    }

    if(!ansValues.email) {
      errors.email = 'Email is required!';
    } else if (!ansValues.email.match(validRegex)) {
      errors.email = 'This is not a valid email format!';
    }

    return errors;
  }

  useEffect(() => {
    if(Object.keys(formError).length === 0 && isSubmit) {
      axios.post(`/qa/questions/${question.question_id}/answers`, {
        body: ansFormValues.ansBody,
        name: ansFormValues.nickName,
        email: ansFormValues.email,
        photos: photos
      })
        .then((result) => {
          console.log('successfully post answer for question', result);
          onHide();
        })
        .catch((err) => {
          console.log('Fail to post an answer for question', err);
        })
    }
  }, [formError]);

  return(
    <div className="qaModalContainer">
      <button className="closeButton" onClick={onHide}>X</button>
      <div className="qaModalTitle">
        <h3>Submit your Answer</h3>
        <h5>{product.name}: {question.question_body}</h5>
      </div>

      <div className="qaModalBody">
        <label>Your Answer *</label>
          <br />
          <textarea
          maxLength={1000}
          name="ansBody"
          value={ansFormValues.ansBody}
          onChange={handleChange}/>
          <p>{formError.ansBody}</p>
          <br />

        <label>What is your nickname *</label>
          <br />
          <input
          maxLength={60}
          name="nickName"
          value={ansFormValues.nickName}
          placeholder="Example: jack543!"
          onChange={handleChange}/>
          <br />
          <span>For privacy reasons, do not use your full name or email address” will appear.</span>
          <p>{formError.nickName}</p>
          <br />

        <label>Your email *</label>
          <br />
          <input
          maxLength={60}
          name="email"
          value={ansFormValues.email}
          placeholder="Example: jack@email.com"
          onChange={handleChange}/>
          <br />
          <span>For authentication reasons, you will not be emailed.</span>
          <p>{formError.email}</p>

        <br />
        <label>Upload your photos </label>
          <input
          type="file"
          multiple
          onChange={multiplePhotosChange}/>
          <br />
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  )
}

export default AddAnsForm;