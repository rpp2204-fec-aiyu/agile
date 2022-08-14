const React = require('react')
const {createRoot} = require('react-dom/client')
import RatingsAndReviews from './components/ratingsAndReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RatingsAndReviews />
      </div>
    )
  }
}

const root = createRoot( document.getElementById('app'));
root.render(<App/>);