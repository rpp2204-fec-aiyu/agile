import React, { useState } from 'react'

const AddAnsForm = ({onHide, product, question}) => {
  const [ansFormValues, setAnsFormValues] = useState({
    ansBody: "",
    nickName: "",
    email: "",
    photos: []
  })

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
          name="question"/>
          <br />
          <br />

        <label>What is your nickname *</label>
        <br />
        <input
        maxLength={60}
        name="nickname"
        placeholder="Example: jack543!"/>
        <br />
        <span>For privacy reasons, do not use your full name or email address” will appear.</span>
        <br />
        <br />

        <label>Your email *</label>
        <br />
        <input
        maxLength={60}
        name="email"
        placeholder="Example: jack@email.com"/>
        <br />
        <span>For authentication reasons, you will not be emailed.</span>
        <br />

        <br />
        <label>Upload your photos </label>
        <input type="file"/>
        <br />
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={onHide}>Submit</button>
      </div>

    </div>
  )
}

export default AddAnsForm;