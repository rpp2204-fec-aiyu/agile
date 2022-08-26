import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QuestionView from './QuestionView.jsx'

const QuesAns = () => {
  const [questionList, setQuestionList] = useState([]);
  const [questionToShow, setQuestionToShow] = useState(2);
  // const [answerToShow, setAnswerToShow] = useState(2);
  // const [loadAnsButton, setLoadAnsButton] = useState(false);

  const getQuestionList = () => {
   axios.get('/questions')
      .then((res) => {
        console.log('SUCESSFULLY GET BACK THE QUESTIONS LIST ', res.data.results);
        setQuestionList([...res.data.results]);
      })
      .catch((err) => {
        console.log('FAIL TO GET BACK THE QUESTIONS LIST', err);
      })
  }

  const showMoreQuestion = () => {
    setQuestionToShow(questionList.length);
  }

  // const showMoreAns = () => {
  //   let longest = 0;
  //   for (var i = 0; i < questionList.length; i++) {
  //     const current = questionList[i];
  //     if(Object.keys(current.answers).length > longest) {
  //       longest = Object.keys(current.answers).length;
  //     }
  //   }

  //   //By default only two answers will show. “See more answers” should display below the list.When expanded, the button to “See more answers” should change to read “Collapse answers”.
  //   setLoadAnsButton(!loadAnsButton);
  //   if(loadAnsButton) {
  //     setAnswerToShow(2);
  //   } else {
  //     setAnswerToShow(longest);
  //   }
  // }

  useEffect(() => {
    getQuestionList();
  }, [])


  return(
    <div>

      <h1>Questions and Answers</h1>
      <input placeholder="HAVE A QUESTIONS? SEARCH FOR ANSWERS..."/>
      <button>Search</button>

      <div>
        {questionList.slice(0, questionToShow).map(question =>
          // <QuestionView question={question} answerToShow={answerToShow} setAnswerToShow={setAnswerToShow}/>
          <QuestionView question={question}/>
        )}
      <br />
      {/* <span onClick={() => {showMoreAns()}}>{loadAnsButton ? 'Collapse answers' : 'Load More Answers'}</span> */}
      <br />
      {questionList.length > 2 ? <button onClick={() => {showMoreQuestion()}}>MORE ANSWERED QUESTIONS</button> : null}
      <button>ADD A QUESTION +</button>
      </div>

    </div>
  )
}

export default QuesAns;
//module.exports = QuesAns;
