import React from 'react'
// import { Modal, Button, Form } from "react-bootstrap";

const AddQuesForm = ({onHide}) => {

  return (
    <div className="qaModalContainer">
      <button className="closeButton" onClick={onHide}>X</button>
      <div className="qaModalTitle">
        <h3>Ask Your Question</h3>
        <h5>subtitle</h5>
      </div>

      <div className="qaModalBody">
        <label>Your Question</label>
        <br />
        <textarea
        maxLength={1000}
        name="question"
        placeholder="Why did you like the product or not?"/>
        <br />
        <br />

        <label>What is your nickname</label>
        <br />
        <input
        maxLength={60}
        name="nickname"
        placeholder="Example: jackson11!"/>
        <br />
        <span>For privacy reasons, do not use your full name or email address” will appear.</span>
        <br />
        <br />

        <label>Your email</label>
        <br />
        <input
        maxLength={60}
        name="email"/>
        <br />
        <span>For authentication reasons, you will not be emailed.</span>
        <br />
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={onHide}>Submit</button>
      </div>

    </div>
  )
}

export default AddQuesForm;