import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
      <img {...this.props} alt="img" />
    );
  }
}

export default Image;
