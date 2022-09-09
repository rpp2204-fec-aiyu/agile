import React, { useState } from 'react'

const AnswerView = ({answer, updateAnsHelpfulness, reportAnswer}) => {
  const [report, setReport] = useState('Report');

  const handleReport = () => setReport('Reported');

  return(
    <div>
      <span className="ansBody">{answer.body}</span>


      {answer.photos.length > 0 ? answer.photos.map(photo => <img className="ansImage" src={photo}/>) : null}

      <div className="ansdetails">
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