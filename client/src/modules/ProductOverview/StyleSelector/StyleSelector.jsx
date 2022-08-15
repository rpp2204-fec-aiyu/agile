import React from 'react'
import axios from 'axios'
import ThumbnailContainer from './ThumbnailContainer.jsx'

export default class StyleSelector extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   //photos: [],
    //   styles: []

    // }

  }

  // componentDidMount() {
  //   let id = this.props.id
  //   console.log('ID FROM PROPS: ', id)
  //   axios.get(`/products/${id}`)
  //     .then(results => {
  //       console.log('STYLE',results.data)
  //       //let styles = []
  //       // results.data.results.forEach(style => {
  //       //   thumbnails.push(style.photos[0].thumbnail_url)
  //       // })
  //       this.setState({
  //         styles: results.data.results
  //       }, () => console.log(this.state.styles))
  //     })
  // }

  render() {
    return (
      <div>
        {/*<Title /> */}
        {/*this.state.photos.length ? <ThumbnailContainer photos={this.state.photos}/> : null*/}
        {/*{this.state.styles.length ? <ThumbnailContainer styles={this.state.styles}/> : null} */}
        <ThumbnailContainer styles={this.props.styles} setStyle={this.props.setStyle}/>

      </div>
    )
  }
}