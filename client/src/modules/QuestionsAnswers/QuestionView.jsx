//const React = require('react')
import React, { useState, useEffect } from 'react'
import AddAnsForm from './AddAnsForm.jsx'
import AnswerView from './AnswerView.jsx'

const QuestionView = ({question, product, updateQuestionHelpfulness, updateAnsHelpfulness, reportAnswer}) => {
  const [answerToShow, setAnswerToShow] = useState(2);
  const [loadAnsButton, setLoadAnsButton] = useState(false);
  const [showAnsForm, setShowAnsForm] = useState(false);

  const handleCloseAnsForm = () => setShowAnsForm(false);
  const handleOpenAnsForm = () => setShowAnsForm(true);

  const showMoreAns = () => {
    //By default only two answers will show. “See more answers” should display below the list.When expanded, the button to “See more answers” should change to read “Collapse answers”.
    setLoadAnsButton(!loadAnsButton);
    if(loadAnsButton) {
      setAnswerToShow(2);
    } else {
      setAnswerToShow(Object.keys(question.answers).length);
    }
  }

  return(
    <div>


      <h3>Q: {question.question_body}</h3>
      <div>
        <span>Helpful? </span>
        <a href="#" onClick={() => {updateQuestionHelpfulness(question.question_id)}}>Yes</a>
        <span>({question.question_helpfulness})</span>
        <span>&nbsp;|&nbsp;</span>
        <a href="#" onClick={handleOpenAnsForm}>Add Answer</a>
      </div>


      {Object.keys(question.answers).slice(0, answerToShow).map(key =>
        <AnswerView key={question.answers[key].id} answer={question.answers[key]} updateAnsHelpfulness={updateAnsHelpfulness} reportAnswer={reportAnswer}/>
      )}

      <br />

      {Object.keys(question.answers).length > 2 ? <span onClick={() => {showMoreAns()}}>{loadAnsButton ? 'Collapse answers' : 'Load More Answers'}</span> : null}
      <br />
      *******************************************************************************
      {showAnsForm && <AddAnsForm onHide={handleCloseAnsForm}  product={product} question={question}/>}
    </div>
  )
}

export default QuestionView;