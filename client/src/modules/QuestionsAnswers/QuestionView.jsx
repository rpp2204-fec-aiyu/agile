//const React = require('react')
import React, { useState } from 'react'


const QuestionView = ({question}) => {
  const [answerToShow, setAnswerToShow] = useState(2);
  const [loadAnsButton, setLoadAnsButton] = useState(false);

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
      <span>Helpful? </span>
      <a href="">Yes</a>
      <span>({question.question_helpfulness})</span>
      <span>&nbsp;|&nbsp;</span>
      <a href="">Add Answer</a>
      {Object.keys(question.answers).slice(0, answerToShow).map(key =>
        <div>
          <h4>A: {question.answers[key].body}</h4>

          {question.answers[key].photos.length > 0 ? question.answers[key].photos.map(photo => <img style={{ width: 100, height: 100 }} src={photo}/>) : null}

          <div>
            by:&nbsp;
            {question.answers[key].answerer_name === 'Seller' ? <span style={{fontWeight: 'bold'}}>Seller</span> : <span>{question.answers[key].answerer_name}</span>}
            ,&nbsp;
            <span>{question.answers[key].date}</span>
            &nbsp;|&nbsp;  Helpful? &nbsp;
            <a href="">Yes</a>
            <span>({question.answers[key].helpfulness})</span>
            <span> | </span>
            <a href="">Report</a>
          </div>

        </div>
      )}

      <br />
      {Object.keys(question.answers).length > 2 ? <span onClick={() => {showMoreAns()}}>{loadAnsButton ? 'Collapse answers' : 'Load More Answers'}</span> : null}

    </div>
  )
}

//module.exports = QuestionView;
export default QuestionView;