//const React = require('react')
import React, { useState } from 'react'
import AddAnsForm from './AddAnsForm.jsx'
import AnswerView from './AnswerView.jsx'

const QuestionView = ({question}) => {
  const [answerToShow, setAnswerToShow] = useState(2);
  const [loadAnsButton, setLoadAnsButton] = useState(false);
  const [showAnsForm, setShowAnsForm] = useState(false);
  const [quesHelpfulness, setQuesHelpfuless] = useState(question.question_helpfulness);

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

  const updateQuestionHelpfulness = () => {
    setQuesHelpfuless(quesHelpfulness + 1);
  }

  return(
    <div>
      <h3>Q: {question.question_body}</h3>
      <span>Helpful? </span>
      <a href="#" onClick={updateQuestionHelpfulness}>Yes</a>
      <span>({quesHelpfulness})</span>
      <span>&nbsp;|&nbsp;</span>
      <a href="#" onClick={handleOpenAnsForm}>Add Answer</a>

      {Object.keys(question.answers).slice(0, answerToShow).map(key =>
        <AnswerView answer={question.answers[key]}/>
      )}

      <br />

      {Object.keys(question.answers).length > 2 ? <span onClick={() => {showMoreAns()}}>{loadAnsButton ? 'Collapse answers' : 'Load More Answers'}</span> : null}

      {showAnsForm && <AddAnsForm onHide={handleCloseAnsForm}/>}
    </div>
  )
}

export default QuestionView;