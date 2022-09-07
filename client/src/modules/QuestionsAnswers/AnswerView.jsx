import React, { useState } from 'react'

const AnswerView = ({answer, updateAnsHelpfulness, reportAnswer}) => {
  const [report, setReport] = useState('Report');

  const handleReport = () => setReport('Reported');

  return(
    <div>
      <h4>A: {answer.body}</h4>

      {answer.photos.length > 0 ? answer.photos.map(photo => <img style={{ width: 100, height: 100 }} src={photo}/>) : null}

      <div>
        by:&nbsp;
        {answer.answerer_name === 'Seller' ? <span style={{fontWeight: 'bold'}}>Seller</span> : <span>{answer.answerer_name}</span>}
        ,&nbsp;
        <span>{answer.date}</span>
        &nbsp;|&nbsp;  Helpful? &nbsp;
        <a href="#" onClick={() => {updateAnsHelpfulness(answer.id)}}>Yes</a>
        <span>({answer.helpfulness})</span>
        <span> | </span>
        <a href="#" onClick={() => {reportAnswer(answer.id)}}>Report</a>
      </div>

  </div>
  )
}

export default AnswerView;