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
    console.log('quality: ', quality);

    if (quality) {
      var qualityBreakdown =
      <div className='qualityBreakdown'>
        <div className='feedback-average'>{quality.value}</div>
      </div>
    }
    if (size) {
      var sizeBreakdown =
      <div className='sizeBreakdown'>
        <div className='feedback-average'>{size.value}</div>
      </div>
    }
    if (width) {
      var widthBreakdown =
      <div className='widthBreakdown'>
        <div className='feedback-average'>{width.value}</div>
      </div>
    }
    if (comfort) {
      var comfortBreakdown =
      <div className='comfortBreakdown'>
        <div className='feedback-average'>{comfort.value}</div>
      </div>
    }
    if (fit) {
      var fitBreakdown =
      <div className='fitBreakdown'>
        <div className='feedback-average'>{fit.value}</div>
      </div>
    }
    if (length) {
      var lengthBreakdown =
      <div className='lengthBreakdown'>
        <div className='feedback-average'>{length.value}</div>
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