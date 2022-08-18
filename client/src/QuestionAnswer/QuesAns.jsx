const React = require('react')
const axios = require('axios')
const QuestionView = require('./QuestionView.jsx');

class QuesAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: []
    }
  }

  getQuestionList() {
    axios.get('/questions')
      .then((res) => {
        const questionList = res.data;
        this.setState({questionList});
        //console.log('SUCESSFULLY GET BACK THE QUESTIONS LIST ', res);
      })
      .catch((err) => {
        console.log('FAIL TO GET BACK THE QUESTIONS LIST', err);
      })
  }

  componentDidMount(){
    this.getQuestionList();
  }

  render() {
    return(
      <div>
        <h1>Questions and Answers</h1>
        <input placeholder="HAVE A QUESTIONS? SEARCH FOR ANSWERS..."/>
        <div>
          {this.state.questionList.map(question =>
            <QuestionView question={question}/>
          )}

          <p></p>
        </div>
      </div>
    )
  }
}

module.exports = QuesAns;