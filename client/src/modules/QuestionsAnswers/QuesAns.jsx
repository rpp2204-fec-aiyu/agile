import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QuestionView from './QuestionView.jsx'
import AddQuesForm from './AddQuesForm.jsx'

const QuesAns = ({product, productId}) => {
  const [questionList, setQuestionList] = useState([]);
  const [questionToShow, setQuestionToShow] = useState(2);
  const [showQuesForm, setShowQuesForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleCloseQuesForm = () => setShowQuesForm(false);
  const handleShowQuesForm = () => setShowQuesForm(true);

  const getQuestionList = () => {
   axios.get(`/questions/${productId}`)
      .then((res) => {
        console.log('SUCESSFULLY GET BACK THE QUESTIONS LIST ', res.data);
        setQuestionList([...res.data.results]);
      })
      .catch((err) => {
        console.log('FAIL TO GET BACK THE QUESTIONS LIST', err);
      })
  }

  const showMoreQuestion = () => {
    setQuestionToShow(questionList.length);
  }

  const handleChange = (e) => {
    //let filtered = [];
    setSearchTerm(e.target.value);
    console.log(" HERE IS WHAT USER SEARCH: ", searchTerm);
    if(searchTerm.length >= 2) {
      setFiltered(questionList.filter(question => question.question_body.includes(searchTerm)));
      console.log("here is the result list: ", filtered);
    }

    //console.log('FILTER', filtered);
  }
  const handleSearch = () => {
    setQuestionList(filtered);
  }

  useEffect(() => {
    getQuestionList();
  }, [])


  return(
    <div className="qaBackground">

      <h1>Questions and Answers</h1>
      <input value={searchTerm} placeholder="HAVE A QUESTIONS? SEARCH FOR ANSWERS..." onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>

      <div>
        {questionList.slice(0, questionToShow).map(question =>
          <QuestionView key={question.question_id} question={question} product={product}/>
        )}
      <br />
      <br />
      {questionList.length > 2 ? <button onClick={() => {showMoreQuestion()}}>MORE ANSWERED QUESTIONS</button> : null}
      <button onClick={handleShowQuesForm}>ADD A QUESTION +</button>
      {showQuesForm && <AddQuesForm product={product} onHide={handleCloseQuesForm}/>}
      </div>

    </div>
  )
}

export default QuesAns;
//module.exports = QuesAns;
