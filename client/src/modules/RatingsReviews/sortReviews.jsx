const React = require('react');

export default class SortReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleSortChange(e) {
    this.props.sortReviews(e.target.value);
  }

  render() {
    return (
        <form onChange={this.handleSortChange.bind(this)}>
          <select id='sortReview'>
            <option selected value='relevant'>Relevant</option>
            <option value='helpful'>Helpful</option>
            <option value='newest'>Newest</option>
          </select>
        </form>
    )
  }
}