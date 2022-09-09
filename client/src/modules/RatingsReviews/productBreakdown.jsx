const React = require('react')

export default class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculatePointerPosition(value) {
    return ((value / 5) * 100).toString() + '%';
  }

  render() {
    var quality = this.props.productQualityMetaData;
    var size = this.props.productSizeMetaData;
    var comfort = this.props.productComfortMetaData;
    var width = this.props.productWidthMetaData;
    var fit = this.props.productFitMetaData;
    var length = this.props.productLengthMetaData;
    // console.log('quality: ', quality);
    // console.log('size: ', size);
    // console.log('comfort: ', comfort);
    // console.log('width: ', width);
    // console.log('fit: ', fit);
    // console.log('length: ', length);

    if (quality) {
      var qualityBreakdown =
        <div className='qualityBreakdown'>
          <div className='characteristic-title'>Quality</div>
          <div className='middleBar'>
            <div className='characteristic-container'>
              <div className='quality-pointer' style={{ width: this.calculatePointerPosition(quality.value) }}> &#9660;
              </div>
              <div className="bottomLeft">Poor</div>
              <div className="bottomRight">Perfect</div>
            </div>
          </div>
        </div>
    }
    if (size) {
      var sizeBreakdown =
        <div className='sizeBreakdown'>
          <div className='characteristic-title'>Size</div>
          <div className='middleBar'>
            <div className='characteristic-container'>
              <div className='size-pointer' style={{ width: this.calculatePointerPosition(size.value) }}> &#9660;</div>
              <div className="bottomLeft">Too small</div>
              <div className="bottomRight">Too big</div>
            </div>
          </div>
        </div>
    }
    if (width) {
      var widthBreakdown =
        <div className='widthBreakdown'>
          <div className='characteristic-title'>Width</div>
          <div className='middleBar'>
            <div className='characteristic-container'>
              <div className='width-pointer' style={{ width: this.calculatePointerPosition(width.value) }}> &#9660;</div>
              <div className="bottomLeft">Too narrow</div>
              <div className="bottomRight">Too wide</div>
            </div>
          </div>
        </div>
    }
    if (comfort) {
      var comfortBreakdown =
        <div className='comfortBreakdown'>
          <div className='characteristic-title'>Comfort</div>
          <div className='middleBar'>
          <div className='characteristic-container'>
              <div className='comfort-pointer' style={{width: this.calculatePointerPosition(comfort.value)}}> &#9660;</div>
              <div className="bottomLeft">Uncomfortable</div>
              <div className="bottomRight">Perfect</div>
            </div>
          </div>
        </div>
    }
    if (fit) {
      var fitBreakdown =
        <div className='fitBreakdown'>
          <div className='characteristic-title'>Fit</div>
          <div className='middleBar'>
            <div className='characteristic-container'>
              <div className='fit-pointer' style={{ width: this.calculatePointerPosition(fit.value) }}> &#9660;</div>
              <div className="bottomLeft">Runs tight</div>
              <div className="bottomRight">Runs long</div>
            </div>
          </div>
        </div>
    }
    if (length) {
      var lengthBreakdown =
        <div className='lengthBreakdown'>
          <div className='characteristic-title'>Length</div>
          <div className='middleBar'>
          <div className='characteristic-container'>
              <div className='length-pointer' style={{width: this.calculatePointerPosition(length.value)}}> &#9660;</div>
            </div>
            <div className="bottomLeft">Runs short</div>
            <div className="bottomRight">Runs long</div>
          </div>
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