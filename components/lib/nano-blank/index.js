import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Blank extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };
  static defaultProps = {
    children: [],
  };

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default Blank;

