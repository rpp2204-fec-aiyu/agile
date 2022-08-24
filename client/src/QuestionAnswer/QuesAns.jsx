// const React = require('react')
// const axios = require('axios')
// const {useState, useEffect} = require('react')
// const QuestionView = require('./QuestionView.jsx');
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QuestionView from './QuestionView.jsx'

const QuesAns = () => {
  const [questionList, setQuestionList] = useState([]);
  const [questionToShow, setQuestionToShow] = useState(2);
  const [answerToShow, setAnswerToShow] = useState(2);

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

  const showMoreAns = () => {
    let longest = 0;
    for (var i = 0; i < questionList.length; i++) {
      const current = questionList[i];
      if(Object.keys(current.answers).length > longest) {
        longest = Object.keys(current.answers).length;
      }
    }
    setAnswerToShow(longest);
  }

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
          <QuestionView question={question} answerToShow={answerToShow} setAnswerToShow={setAnswerToShow}/>
        )}
      <br />
      <span onClick={() => {showMoreAns()}}>Load More Answers</span>
      <br />
      <button onClick={() => {showMoreQuestion()}}>MORE ANSWERED QUESTIONS</button>
      <button>ADD A QUESTION +</button>
      </div>

    </div>
  )
}

export default QuesAns;
//module.exports = QuesAns;
