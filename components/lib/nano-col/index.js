import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Col extends Component {
  static propTypes = {
    className: PropTypes.string,
    span: PropTypes.any,
    align: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    className: '',
    span: '1',
    align: '',
    children: [],
  };

  render() {
    const {
      className,
      span,
      align,
      children,
    } = this.props;
    return (
      <div className={classNames(`col-sm-${span}`, `col-md--${span}`, className, align)}>{children}</div>
    );
  }
}

export default Col;
