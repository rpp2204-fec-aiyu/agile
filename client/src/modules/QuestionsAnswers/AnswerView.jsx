import React, { useState } from 'react'
import Moment from 'moment';

const AnswerView = ({answer, updateAnsHelpfulness, reportAnswer}) => {
  const [report, setReport] = useState('Report');

  const handleReport = () => setReport('Reported');

  return(
    <div>
      <span className="ansBody">{answer.body}</span>


      {answer.photos.length > 0 ? answer.photos.map(photo => <img className="ansImage" alt="answerviewphoto" src={photo}/>) : null}

      <div className="ansdetails">
        by:&nbsp;
        {answer.answerer_name === 'Seller' ? <span style={{fontWeight: 'bold'}}>Seller</span> : <span>{answer.answerer_name}</span>}
        ,&nbsp;
        <span>{Moment(answer.date).format('MMM DD, YYYY')}</span>
        &nbsp;|&nbsp;  Helpful?
        {/* <a href="#" onClick={() => {updateAnsHelpfulness(answer.id)}}>Yes</a> */}
        <button onClick={() => {updateAnsHelpfulness(answer.id)}} className="addAnsButton"><u>Yes</u></button>
        <span>({answer.helpfulness})</span>
        <span> | </span>
        {/* <a href="#" onClick={() => {reportAnswer(answer.id)}}>Report</a> */}
        <button onClick={() => {reportAnswer(answer.id)}} className="addAnsButton"><u>Report</u></button>
      </div>

  </div>
  )
}

export default AnswerView;