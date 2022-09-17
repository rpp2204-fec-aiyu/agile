import React, { useState } from 'react'
import Moment from 'moment';

const AnswerView = ({answer, updateAnsHelpfulness, reportAnswer}) => {
  const [report, setReport] = useState('Report');
  const [isClicked, setIsClicked] = useState(false);

  const handleReport = () => setReport('Reported');

  const checkIsClicked = (a_id) => {
    if(isClicked === false) {
      updateAnsHelpfulness(a_id);
      setIsClicked(true);
    }
  }

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
        <button onClick={() => {checkIsClicked(answer.id)}} className="addAnsButton"><u>Yes</u></button>
        <span>({answer.helpfulness})</span>
        <span> | </span>
        <button onClick={() => {reportAnswer(answer.id)}} className="addAnsButton"><u>Report</u></button>
      </div>

  </div>
  )
}

export default AnswerView;