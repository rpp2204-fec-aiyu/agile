const React = require('react')

export default class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    var quality = this.props.productQualityMetaData;
    var size = this.props.productSizeMetaData;
    var comfort = this.props.productComfortMetaData;
    var width = this.props.productWidthMetaData;
    var fit = this.props.productFitMetaData;
    var length = this.props.productLengthMetaData;

    if (quality) {
      var qualityBreakdown =
      <div className='qualityBreakdown'>
      </div>
    }
    if (size) {
      var sizeBreakdown =
      <div className='sizeBreakdown'>
      </div>
    }
    if (width) {
      var widthBreakdown =
      <div className='widthBreakdown'>
      </div>
    }
    if (comfort) {
      var comfortBreakdown =
      <div className='comfortBreakdown'>
      </div>
    }
    if (fit) {
      var fitBreakdown =
      <div className='fitBreakdown'>
      </div>
    }
    if (length) {
      var lengthBreakdown =
      <div className='lengthBreakdown'>
      </div>
    }
    return (
      <div id='characteristicsSummary'>
        {qualityBreakdown}
        {sizeBreakdown}
        {lengthBreakdown}
        {widthBreakdown}
        {comfortBreakdown}
        {fitBreakdown}
      </div>
    )
  }
}