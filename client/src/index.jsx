// const React = require('react');
// const ReactDOM = require('react-dom');
import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';

class App extends React.Component {

  render() {
    return (
      <>

        <RelatedProducts />
      </>

    )
  }

}


ReactDOM.render(<App/>, document.getElementById('app'))