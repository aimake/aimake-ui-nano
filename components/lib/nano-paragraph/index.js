import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Paragraph extends Component {
  static propTypes = {
    children: PropTypes.string,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {children}
      </div>
    );
  }
}

export default Paragraph;
