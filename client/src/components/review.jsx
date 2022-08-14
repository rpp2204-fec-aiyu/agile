const React = require('react')

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {}
  }

  render() {
    return (
      <div>
        <div value={this.props.review}></div>
      </div>
    )
  }
}