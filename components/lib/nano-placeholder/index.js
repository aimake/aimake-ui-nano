import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaceHolder extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    style: {},
    children: [],
  };

  render() {
    const { children, style, ...otherProps } = this.props;
    const placeholderStyle = {
      border: '1px dashed #aaa',
      lineHeight: style.height,
      backgroundColor: '#F5E075',
      display: 'inline-block',
      overflow: 'hidden',
      ...style,
    };
    return (
      <div {...otherProps} style={placeholderStyle} className="text-center">
        {children}
      </div>
    );
  }
}

export default PlaceHolder;
