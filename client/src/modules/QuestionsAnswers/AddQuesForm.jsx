import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Modal, Button, Form } from "react-bootstrap";

const AddQuesForm = ({product, onHide, addQuestion}) => {
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
      addQuestion(quesFormValues.questionBody, quesFormValues.nickName, quesFormValues.email, product.id);
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
        className="inputBox"
        maxLength={1000}
        name="questionBody"
        value={quesFormValues.questionBody}
        placeholder="Why did you like the product or not?"
        onChange={handleChange}/>
        <p className="errorWarning">{formError.questionBody}</p>

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
        <p className="errorWarning">{formError.nickName}</p>

        <label>Your email *</label>
        <br />
        <input
        maxLength={60}
        name="email"
        value={quesFormValues.email}
        onChange={handleChange}/>
        <br />
        <span>For authentication reasons, you will not be emailed.</span>
        <p className="errorWarning">{formError.email}</p>
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
      </div>
      <br />

    </div>
  )
}

export default AddQuesForm;