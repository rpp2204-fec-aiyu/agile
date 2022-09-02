import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Modal, Button, Form } from "react-bootstrap";

const AddQuesForm = ({product, onHide}) => {
  const [quesFormValues, setQuesFormValues] = useState({
    questionBody: "",
    nickName: "",
    email: "",
    product_id: null
});
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setQuesFormValues({
      ...quesFormValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    setFormError(validation(quesFormValues))
    setIsSubmit(true);
  }

  useEffect(() => {
    if(Object.keys(formError).length === 0 && isSubmit) {
      axios.post('/qa/questions', {
        body: quesFormValues.questionBody,
        name: quesFormValues.nickName,
        email: quesFormValues.email,
        product_id: product.id
      })
        .then((result) => {
          console.log('successfully post a question', result);
          onHide();
        })
        .catch((err) => {
          console.log('FAIL TO POST A QUESTION', err);
        })
      // console.log(`CLICKED: Question: ${quesFormValues.questionBody}, NickNAme: ${quesFormValues.nickName}, email: ${quesFormValues.email}, product_id: ${product.id}`)
      // onHide();
    }
  }, [formError]);

  const validation = (formValues) => {
    const errors = {};
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!formValues.questionBody) {
      errors.questionBody = 'Question is required!';
    }

    if(!formValues.nickName) {
      errors.nickName = 'Nickname is required!';
    }

    if(!formValues.email) {
      errors.email = 'Email is required!';
    } else if (!formValues.email.match(validRegex)) {
      errors.email = 'This is not a valid email format!';
    }

    return errors;
  }

  return (
    <div className="qaModalContainer">
      <button className="closeButton" onClick={onHide}>X</button>
      <div className="qaModalTitle">
        <h3>Ask Your Question</h3>
        <h5>About the {product.name}</h5>
      </div>

      <div className="qaModalBody">
        <label>Your Question *</label>
        <br />
        <textarea
        maxLength={1000}
        name="questionBody"
        value={quesFormValues.questionBody}
        placeholder="Why did you like the product or not?"
        onChange={handleChange}/>
        <p>{formError.questionBody}</p>

        <label>What is your nickname ? *</label>
        <br />
        <input
        maxLength={60}
        name="nickName"
        value={quesFormValues.nickName}
        placeholder="Example: jackson11!"
        onChange={handleChange}/>
        <br />
        <span>For privacy reasons, do not use your full name or email address” will appear.</span>
        <p>{formError.nickName}</p>

        <label>Your email *</label>
        <br />
        <input
        maxLength={60}
        name="email"
        value={quesFormValues.email}
        onChange={handleChange}/>
        <br />
        <span>For authentication reasons, you will not be emailed.</span>
        <p>{formError.email}</p>
        <br />
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  )
}

export default AddQuesForm;