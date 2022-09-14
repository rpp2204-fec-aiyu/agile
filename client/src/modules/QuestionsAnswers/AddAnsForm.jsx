import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddAnsForm = ({onHide, product, question, addAns}) => {
  const [ansFormValues, setAnsFormValues] = useState({
    ansBody: "",
    nickName: "",
    email: ""
  });

  const [photos, setPhotos] = useState([]);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [countPhoto, setCountPhoto] = useState(0);
  const [savePhoto, setSavePhoto] = useState([]);

  const handleChange = (e) => {
    setAnsFormValues({
      ...ansFormValues,
      [e.target.name]: e.target.value
    });
  };

  const multiplePhotosChange = (e) => {
    const [file] = event.target.files;
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      console.log('e.target: ', e.target);
      console.log('e.target.result: ', e.target.result);
      console.log('e.target.result.data: ', e.target.result.data);

      photos.push(e.target.result);
      setCountPhoto(countPhoto + 1);
      console.log('HERE ARE ARRAY OF PHOTOS:', photos);
      setSavePhoto(photos);
      setPhotos(photos);
    }
    fileReader.readAsDataURL(file);
    console.log('IMAGES:', [file]);
    //setPhotos(e.target.files);
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
      onHide();
      addAns(ansFormValues.ansBody, ansFormValues.nickName, ansFormValues.email, photos, question.question_id);
      // axios.post(`/qa/questions/${question.question_id}/answers`, {
      //   data: {
      //     body: ansFormValues.ansBody,
      //     name: ansFormValues.nickName,
      //     email: ansFormValues.email,
      //     rawPhotos: photos
      //   }
      // })
      //   .then((result) => {
      //     console.log('successfully post answer for question', result);
      //     onHide();
      //   })
      //   .catch((err) => {
      //     console.log('Fail to post an answer for question', err);
      //   })
    }
  }, [formError]);

  return(
    <div className="qaModalContainer">
      <button className="closeButton" onClick={() => {onHide()}}>X</button>
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
        <label>Upload your photos {photos.length} </label>
          {photos.length < 5 && <input type="file" accept='image/*' onChange={multiplePhotosChange}/>}
          <br />
          {photos.map(photo => <img className="ansFormPhoto" src={photo} />)}
      </div>

      <div className="qaModalFooter">
        <button className="submitButton" onClick={() => {handleSubmit()}}>Submit</button>
      </div>
      <br />

    </div>
  )
}

export default AddAnsForm;