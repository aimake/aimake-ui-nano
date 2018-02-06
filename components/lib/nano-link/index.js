import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    children: '',
  };

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <a {...otherProps}>
        {children}
      </a>
    );
  }
}

export default Link;
