const React = require('react')

const QuestionView = ({question}) => {
  return(
    <div>
      <h3>Q: {question.question_body}</h3>
      <span>Helpful? </span>
      <button>Yes ({question.question_helpfulness})</button>
      
    </div>
  )
}

module.exports = QuestionView;