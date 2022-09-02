const React = require('react')
import ReactDOM from 'react-dom';

export default class newPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {files: []};
  }

  handleFileUpload(event) {
    var [file] = event.target.files;
    var fileReader = new FileReader();

    fileReader.onload = (e) => {
      console.log('e.target: ', e.target);
      console.log('e.target.result: ', e.target.result);
      console.log('e.target.result.data: ', e.target.result.data);

      this.state.files.push(e.target.result);
      this.setState({'files': this.state.files});
      this.props.savePhotos(this.state.files);
    }
    fileReader.readAsDataURL(file);
  }

  isNumberOfPhotosLessThanFive() {
    if (this.state.files.length < 5) {
      return true;
    }
    return false;
  }

  render() {
    var numOfPhotosUploaded = this.state.files.length;
    var fileInput;
    var thumbnails;

    if (this.isNumberOfPhotosLessThanFive()) {
      fileInput = <input type='file' className='photoUploader' accept='image/*' onChange={this.handleFileUpload.bind(this)}></input>;
    }

    thumbnails = [...Array(numOfPhotosUploaded)].map((photo, index) => {
      return (
        <img src={this.state.files[index]} key={`photo${index}`}/>
      )
    })

    return (
    <div>
      {fileInput}
      {thumbnails.map((img) => { return img; })}
    </div>
    )
  }
}