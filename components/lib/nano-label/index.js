import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

class Label extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
  };

  static defaultProps = {
    children: '',
    className: '',
  };

  render() {
    const { children, className, ...otherProps } = this.props;
    return (
      <span {...otherProps} className={ClassNames(className, 'd-inline-block')}>
        {children}
      </span>
    );
  }
}

export default Label;
